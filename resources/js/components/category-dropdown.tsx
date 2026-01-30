import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface CategoryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function CategoryDropdown({ value, onChange, disabled = false }: CategoryDropdownProps) {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Temporarily allow everyone to manage categories for testing
    const canManageCategories = true;

    // Debug: Log user roles and permission
    console.log('User roles:', auth?.user?.roles);
    console.log('Can manage categories:', canManageCategories);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setEditingId(null);
                setNewCategoryName('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchCategories = async () => {
        console.log('Fetching categories...');
        try {
            const response = await fetch('/categories');
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Categories data:', data);
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleCreateCategory = async () => {
        console.log('handleCreateCategory called with:', newCategoryName);
        if (!newCategoryName.trim()) {
            console.log('Empty category name, returning');
            return;
        }

        setLoading(true);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
            console.log('CSRF token:', csrfToken);
            
            const response = await fetch('/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName.trim() }),
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (response.ok) {
                const newCategory = await response.json();
                console.log('New category created:', newCategory);
                setCategories([...categories, newCategory]);
                setNewCategoryName('');
                onChange(newCategory.name);
            } else {
                const error = await response.json();
                console.error('Error response:', error);
                alert(error.message || 'Failed to create category');
            }
        } catch (error) {
            console.error('Failed to create category:', error);
            alert('Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async (id: number) => {
        if (!editingName.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ name: editingName.trim() }),
            });

            if (response.ok) {
                const updatedCategory = await response.json();
                setCategories(categories.map(cat => 
                    cat.id === id ? updatedCategory : cat
                ));
                if (value === categories.find(cat => cat.id === id)?.name) {
                    onChange(updatedCategory.name);
                }
                setEditingId(null);
            }
        } catch (error) {
            console.error('Failed to update category:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        const category = categories.find(cat => cat.id === id);
        if (!category) return;

        setLoading(true);
        try {
            const response = await fetch(`/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });

            if (response.ok) {
                setCategories(categories.filter(cat => cat.id !== id));
                if (value === category.name) {
                    onChange('');
                }
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (category: Category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingName('');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span>{value || 'Select category'}</span>
                <ChevronDown className="h-4 w-4" />
            </Button>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                    {/* Category list */}
                    <div className="p-1">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between p-2 hover:bg-accent rounded group"
                            >
                                {editingId === category.id ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <Input
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            className="h-8 text-sm"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUpdateCategory(category.id);
                                                } else if (e.key === 'Escape') {
                                                    cancelEditing();
                                                }
                                            }}
                                            autoFocus
                                        />
                                        <Button
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => handleUpdateCategory(category.id)}
                                            disabled={loading}
                                        >
                                            <Check className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-6 w-6 p-0"
                                            onClick={cancelEditing}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="flex-1 text-left text-sm"
                                            onClick={() => onChange(category.name)}
                                        >
                                            {category.name}
                                        </button>
                                        {canManageCategories && (
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => startEditing(category)}
                                                >
                                                    <Edit2 className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0 text-destructive"
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    disabled={loading}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Add new category */}
                        {/* Temporarily always show for testing */}
                        <div className="border-t mt-2 pt-2">
                            {newCategoryName ? (
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="New category name"
                                        className="h-8 text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleCreateCategory();
                                            } else if (e.key === 'Escape') {
                                                setNewCategoryName('');
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <Button
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={handleCreateCategory}
                                        disabled={loading || !newCategoryName.trim()}
                                    >
                                        <Check className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-6 w-6 p-0"
                                        onClick={() => setNewCategoryName('')}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full justify-start text-sm h-8"
                                    onClick={() => {
                                        console.log('Add new category clicked');
                                        setNewCategoryName('new category');
                                    }}
                                >
                                    <Plus className="h-3 w-3 mr-2" />
                                    Add new category
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
