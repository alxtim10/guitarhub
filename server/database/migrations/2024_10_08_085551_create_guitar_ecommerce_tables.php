<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // user_id
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country')->nullable();
            $table->timestamps();
        });

        Schema::create('stores', function (Blueprint $table) {
            $table->id(); // store_id
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('location')->nullable(); // Physical address or URL
            $table->boolean('is_online')->default(1); // Indicates if the store is currently online
            $table->dateTime('last_seen')->nullable(); // Last time the store was accessed
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // category_id
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id(); // product_id
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->integer('stock_quantity');
            $table->string('image_url')->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->dateTime('discount_start_date')->nullable();
            $table->dateTime('discount_end_date')->nullable();
            $table->timestamps();
            $table->integer('total_purchases')->default(0);
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id(); // transaction_id
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('transaction_date');
            $table->enum('status', ['Pending', 'Shipped', 'Delivered', 'Cancelled']);
            $table->decimal('total_amount', 10, 2);
            $table->string('shipping_address')->nullable();
            $table->timestamps();
        });

        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id(); // transaction_item_id
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // review_id
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('rating'); // e.g., 1 to 5
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        Schema::create('cart', function (Blueprint $table) {
            $table->id(); // cart_id
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('cart_items', function (Blueprint $table) {
            $table->id(); // cart_item_id
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
        });

        Schema::create('last_seen_items', function (Blueprint $table) {
            $table->id(); // last_seen_id
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->timestamps(); // viewed_at will be auto-managed by Laravel
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('last_seen_items');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('transaction_items');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
        Schema::dropIfExists('stores');
    }
};
