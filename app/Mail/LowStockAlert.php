<?php

namespace App\Mail;

use App\Models\Product;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LowStockAlert extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public array $lowStockProducts;
    public array $outOfStockProducts;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user, array $lowStockProducts, array $outOfStockProducts)
    {
        $this->user = $user;
        $this->lowStockProducts = $lowStockProducts;
        $this->outOfStockProducts = $outOfStockProducts;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Stock Alert - Wan Wokabaot Cooperative',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.stock-alert',
            with: [
                'user' => $this->user,
                'lowStockProducts' => $this->lowStockProducts,
                'outOfStockProducts' => $this->outOfStockProducts,
                'lowStockCount' => count($this->lowStockProducts),
                'outOfStockCount' => count($this->outOfStockProducts),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}