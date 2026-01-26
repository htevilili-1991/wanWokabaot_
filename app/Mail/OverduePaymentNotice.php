<?php

namespace App\Mail;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OverduePaymentNotice extends Mailable
{
    use Queueable, SerializesModels;

    public Member $member;
    public float $overdueAmount;
    public int $daysOverdue;
    public int $overdueTransactionsCount;

    /**
     * Create a new message instance.
     */
    public function __construct(Member $member, float $overdueAmount, int $daysOverdue, int $overdueTransactionsCount)
    {
        $this->member = $member;
        $this->overdueAmount = $overdueAmount;
        $this->daysOverdue = $daysOverdue;
        $this->overdueTransactionsCount = $overdueTransactionsCount;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Overdue Payment Notice - Wan Wokabaot Cooperative',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.overdue-payment-notice',
            with: [
                'member' => $this->member,
                'overdueAmount' => $this->overdueAmount,
                'daysOverdue' => $this->daysOverdue,
                'overdueTransactionsCount' => $this->overdueTransactionsCount,
                'formattedAmount' => number_format($this->overdueAmount, 2),
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