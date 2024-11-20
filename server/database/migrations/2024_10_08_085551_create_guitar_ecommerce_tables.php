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
            $table->id();
            $table->string('fullname');
            $table->string('password');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });

        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('domain');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->decimal('rating', 10, 2)->default(0);
            $table->boolean('is_online')->default(0);
            $table->boolean('is_verified')->default(0);
            $table->dateTime('last_seen')->nullable();
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('shipping_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shipping_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('price', 15, 0);
            $table->timestamps();
        });

        Schema::create('payment_method_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_method_category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('admin_fee');
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 15, 0);
            $table->decimal('rating', 10, 2)->default(0);
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->integer('stock_quantity');
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->dateTime('discount_start_date')->nullable();
            $table->dateTime('discount_end_date')->nullable();
            $table->integer('total_purchases')->default(0);
            $table->timestamps();
        });

        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('stock_quantity');
            $table->timestamps();
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id(); // image_id
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('image_url');
            $table->boolean('is_main')->default(0);
            $table->timestamps();
        });

        Schema::create('status_masters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('status_master_id')->constrained()->onDelete('cascade');
            $table->string('status_name');
            $table->decimal('total_price', 15, 0);
            $table->timestamps();
        });

        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->dateTime('transaction_date');
            $table->foreignId('shipping_id')->constrained()->onDelete('cascade');
            $table->string('shipping_name');
            $table->foreignId('payment_method_id')->constrained()->onDelete('cascade');
            $table->string('payment_method_name');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('product_name');
            $table->foreignId('product_variant_id')->constrained()->onDelete('cascade');
            $table->string('product_variant_name');
            $table->decimal('product_price', 15, 0);
            $table->decimal('shipping_price', 15, 0);
            $table->decimal('admin_fee', 15, 0);
            $table->decimal('discount_price', 15, 0);
            $table->decimal('is_discount', 15, 0);
            $table->decimal('total_price', 15, 0);
            $table->string('shipping_address')->nullable();
            $table->timestamps();
        });

        Schema::create('transaction_timelines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->dateTime('event_date');
            $table->string('message');
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('rating'); // e.g., 1 to 5
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_price', 15, 0);
            $table->timestamps();
        });

        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_variant_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 15, 0);
            $table->integer('quantity');
            $table->timestamps();
        });

        Schema::create('last_seen_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->timestamps(); // viewed_at will be auto-managed by Laravel
        });

        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->string('image');
            $table->integer('order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
        Schema::dropIfExists('last_seen_items');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('status_masters');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('transaction_details');
        Schema::dropIfExists('transaction_timelines');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
        Schema::dropIfExists('stores');
        Schema::dropIfExists('shippings');
        Schema::dropIfExists('shipping_variants');
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('payment_method_categories');
    }
};
