import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/roles-permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::index
* @see app/Http/Controllers/Settings/RolePermissionController.php:14
* @route '/settings/roles-permissions'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::store
* @see app/Http/Controllers/Settings/RolePermissionController.php:30
* @route '/settings/roles-permissions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/roles-permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::store
* @see app/Http/Controllers/Settings/RolePermissionController.php:30
* @route '/settings/roles-permissions'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::store
* @see app/Http/Controllers/Settings/RolePermissionController.php:30
* @route '/settings/roles-permissions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::store
* @see app/Http/Controllers/Settings/RolePermissionController.php:30
* @route '/settings/roles-permissions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::store
* @see app/Http/Controllers/Settings/RolePermissionController.php:30
* @route '/settings/roles-permissions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::update
* @see app/Http/Controllers/Settings/RolePermissionController.php:49
* @route '/settings/roles-permissions/{role}'
*/
export const update = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/roles-permissions/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::update
* @see app/Http/Controllers/Settings/RolePermissionController.php:49
* @route '/settings/roles-permissions/{role}'
*/
update.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::update
* @see app/Http/Controllers/Settings/RolePermissionController.php:49
* @route '/settings/roles-permissions/{role}'
*/
update.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::update
* @see app/Http/Controllers/Settings/RolePermissionController.php:49
* @route '/settings/roles-permissions/{role}'
*/
const updateForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::update
* @see app/Http/Controllers/Settings/RolePermissionController.php:49
* @route '/settings/roles-permissions/{role}'
*/
updateForm.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::destroy
* @see app/Http/Controllers/Settings/RolePermissionController.php:70
* @route '/settings/roles-permissions/{role}'
*/
export const destroy = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/roles-permissions/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::destroy
* @see app/Http/Controllers/Settings/RolePermissionController.php:70
* @route '/settings/roles-permissions/{role}'
*/
destroy.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return destroy.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::destroy
* @see app/Http/Controllers/Settings/RolePermissionController.php:70
* @route '/settings/roles-permissions/{role}'
*/
destroy.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::destroy
* @see app/Http/Controllers/Settings/RolePermissionController.php:70
* @route '/settings/roles-permissions/{role}'
*/
const destroyForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::destroy
* @see app/Http/Controllers/Settings/RolePermissionController.php:70
* @route '/settings/roles-permissions/{role}'
*/
destroyForm.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::assignRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:87
* @route '/settings/roles-permissions/assign'
*/
export const assignRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRole.url(options),
    method: 'post',
})

assignRole.definition = {
    methods: ["post"],
    url: '/settings/roles-permissions/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::assignRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:87
* @route '/settings/roles-permissions/assign'
*/
assignRole.url = (options?: RouteQueryOptions) => {
    return assignRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::assignRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:87
* @route '/settings/roles-permissions/assign'
*/
assignRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::assignRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:87
* @route '/settings/roles-permissions/assign'
*/
const assignRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::assignRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:87
* @route '/settings/roles-permissions/assign'
*/
assignRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignRole.url(options),
    method: 'post',
})

assignRole.form = assignRoleForm

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::removeRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:100
* @route '/settings/roles-permissions/remove'
*/
export const removeRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeRole.url(options),
    method: 'post',
})

removeRole.definition = {
    methods: ["post"],
    url: '/settings/roles-permissions/remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::removeRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:100
* @route '/settings/roles-permissions/remove'
*/
removeRole.url = (options?: RouteQueryOptions) => {
    return removeRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::removeRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:100
* @route '/settings/roles-permissions/remove'
*/
removeRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::removeRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:100
* @route '/settings/roles-permissions/remove'
*/
const removeRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\RolePermissionController::removeRole
* @see app/Http/Controllers/Settings/RolePermissionController.php:100
* @route '/settings/roles-permissions/remove'
*/
removeRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: removeRole.url(options),
    method: 'post',
})

removeRole.form = removeRoleForm

const RolePermissionController = { index, store, update, destroy, assignRole, removeRole }

export default RolePermissionController