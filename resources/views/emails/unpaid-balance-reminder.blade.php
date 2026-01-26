<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Unpaid Balance Reminder</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .amount { font-size: 24px; font-weight: bold; color: #d32f2f; }
        .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
        .button { display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Wan Wokabaot Cooperative</h1>
            <h2>Unpaid Balance Reminder</h2>
        </div>

        <div class="content">
            <p>Dear {{ $member->name }},</p>

            <p>This is a friendly reminder that you have an outstanding balance with Wan Wokabaot Cooperative.</p>

            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Outstanding Amount:</strong></p>
                <div class="amount">VT {{ $formattedAmount }}</div>
                <p>From {{ $pendingTransactionsCount }} pending transaction{{ $pendingTransactionsCount > 1 ? 's' : '' }}</p>
            </div>

            <p>Please visit any of our store locations to settle your outstanding balance at your earliest convenience. You can make partial payments or pay the full amount.</p>

            <p>If you have any questions or need assistance, please contact us at your local store or call our support line.</p>

            <p>Thank you for being a valued member of our cooperative!</p>

            <p style="text-align: center;">
                <a href="{{ url('/pending-transactions') }}" class="button">View Your Transactions</a>
            </p>
        </div>

        <div class="footer">
            <p>Wan Wokabaot Cooperative<br>
            Supporting Vanuatu Communities<br>
            Email: info@wanwokabaot.com | Phone: +678 XX XXX XX</p>
        </div>
    </div>
</body>
</html>