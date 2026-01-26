<?php

namespace App\Mail;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UnpaidBalanceReminder extends Mailable
{
    use Queueable, SerializesModels;

    public Member $member;
    public float $unpaidAmount;
    public int $pendingTransactionsCount;

    /**
     * Create a new message instance.
     */
    public function __construct(Member $member, float $unpaidAmount, int $pendingTransactionsCount)
    {
        $this->member = $member;
        $this->unpaidAmount = $unpaidAmount;
        $this->pendingTransactionsCount = $pendingTransactionsCount;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Unpaid Balance Reminder - Wan Wokabaot Cooperative',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.unpaid-balance-reminder',
            with: [
                'member' => $this->member,
                'unpaidAmount' => $this->unpaidAmount,
                'pendingTransactionsCount' => $this->pendingTransactionsCount,
                'formattedAmount' => number_format($this->unpaidAmount, 2),
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