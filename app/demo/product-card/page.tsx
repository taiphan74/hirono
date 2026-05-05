import * as ProductCard from "@/components/ui/product-card";

const sampleImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop";

export default function ProductCardDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-bold">Product Card Demo</h1>
        <div className="flex flex-wrap gap-8">
          <ProductCard.Root>
            <ProductCard.Image src={sampleImage} alt="Headphones" />
            <ProductCard.Badge variant="new">New</ProductCard.Badge>
            <ProductCard.Title>Premium Headphones</ProductCard.Title>
            <ProductCard.Price>$299.99</ProductCard.Price>
            <ProductCard.Description>
              High-quality wireless headphones with noise cancellation.
            </ProductCard.Description>
          </ProductCard.Root>

          <ProductCard.Root>
            <ProductCard.Image src={sampleImage} alt="Smartwatch" />
            <ProductCard.Badge variant="sale">Sale</ProductCard.Badge>
            <ProductCard.Title>Smartwatch Pro</ProductCard.Title>
            <ProductCard.Price>$199.99</ProductCard.Price>
            <ProductCard.Description>
              Track your fitness and stay connected.
            </ProductCard.Description>
          </ProductCard.Root>

          <ProductCard.Root>
            <ProductCard.Image src={sampleImage} alt="Speaker" />
            <ProductCard.Badge>Staff Pick</ProductCard.Badge>
            <ProductCard.Title>Portable Speaker</ProductCard.Title>
            <ProductCard.Price>$89.99</ProductCard.Price>
            <ProductCard.Description>
              Powerful sound in a compact design.
            </ProductCard.Description>
          </ProductCard.Root>
        </div>
      </div>
    </div>
  );
}
