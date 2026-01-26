<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Overdue Payment Notice</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .amount { font-size: 24px; font-weight: bold; color: #d32f2f; }
        .urgent { background-color: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 15px 0; }
        .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
        .button { display: inline-block; background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Wan Wokabaot Cooperative</h1>
            <h2>Overdue Payment Notice</h2>
        </div>

        <div class="content">
            <p>Dear {{ $member->name }},</p>

            <div class="urgent">
                <p><strong>URGENT:</strong> You have overdue payments that require immediate attention.</p>
            </div>

            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Overdue Amount:</strong></p>
                <div class="amount">VT {{ $formattedAmount }}</div>
                <p>Overdue for {{ $daysOverdue }} days</p>
                <p>{{ $overdueTransactionsCount }} overdue transaction{{ $overdueTransactionsCount > 1 ? 's' : '' }}</p>
            </div>

            <p>Your account has outstanding payments that are now considered overdue. To maintain your good standing with the cooperative and avoid service restrictions, please settle these payments as soon as possible.</p>

            <p>You can make payments in person at any of our store locations or contact your account manager for payment arrangements.</p>

            <p>If you believe this notice is in error or need assistance with payment arrangements, please contact us immediately.</p>

            <p style="text-align: center;">
                <a href="{{ url('/pending-transactions') }}" class="button">View Overdue Transactions</a>
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