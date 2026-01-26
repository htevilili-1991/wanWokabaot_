<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Stock Alert</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ff9800; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .product-list { background-color: white; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin: 10px 0; }
        .product-item { border-bottom: 1px solid #eee; padding: 8px 0; }
        .product-item:last-child { border-bottom: none; }
        .low-stock { color: #ff9800; font-weight: bold; }
        .out-of-stock { color: #f44336; font-weight: bold; }
        .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
        .button { display: inline-block; background-color: #ff9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Wan Wokabaot Cooperative</h1>
            <h2>Stock Alert Report</h2>
        </div>

        <div class="content">
            <p>Dear {{ $user->name }},</p>

            <p>This is an automated stock alert for your attention:</p>

            @if($lowStockCount > 0)
            <div class="product-list">
                <h3 class="low-stock">⚠️ Low Stock Items ({{ $lowStockCount }})</h3>
                @foreach($lowStockProducts as $product)
                <div class="product-item">
                    <strong>{{ $product['name'] }}</strong> - Current Stock: {{ $product['current_stock'] }}, Minimum: {{ $product['minimum_stock'] }}
                    @if(isset($product['location_name']))
                        <br><small>Location: {{ $product['location_name'] }}</small>
                    @endif
                </div>
                @endforeach
            </div>
            @endif

            @if($outOfStockCount > 0)
            <div class="product-list">
                <h3 class="out-of-stock">🚫 Out of Stock Items ({{ $outOfStockCount }})</h3>
                @foreach($outOfStockProducts as $product)
                <div class="product-item">
                    <strong>{{ $product['name'] }}</strong> - Current Stock: {{ $product['current_stock'] }}
                    @if(isset($product['location_name']))
                        <br><small>Location: {{ $product['location_name'] }}</small>
                    @endif
                </div>
                @endforeach
            </div>
            @endif

            <p>Please review these items and take appropriate action such as:</p>
            <ul>
                <li>Restocking inventory</li>
                <li>Contacting suppliers</li>
                <li>Updating minimum stock levels if needed</li>
            </ul>

            <p style="text-align: center;">
                <a href="{{ url('/inventory') }}" class="button">View Inventory</a>
            </p>
        </div>

        <div class="footer">
            <p>Wan Wokabaot Cooperative<br>
            Supporting Vanuatu Communities<br>
            Email: info@wanwokabaot.com | Phone: +678 XX XXX XX<br>
            This is an automated notification.</p>
        </div>
    </div>
</body>
</html>