import * as ProductCard from "@/components/ui/product-card";

const features = [
  "List item",
  "List item",
  "List item",
  "List item",
  "List item",
  "List item",
  "List item",
];

export default function ProductCardDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-bold">Product Card Demo</h1>
        <div className="flex flex-wrap gap-8">
          {["Title", "Title", "Title"].map((title, index) => (
            <ProductCard.Root key={`${title}-${index}`}>
              <ProductCard.Top>
                <ProductCard.Title>{title}</ProductCard.Title>
                <ProductCard.Price amount="50" currency="$" label="/ mo" />
                <ProductCard.FeatureList>
                  {features.map((feature, featureIndex) => (
                    <ProductCard.FeatureItem key={`${feature}-${featureIndex}`}>
                      {feature}
                    </ProductCard.FeatureItem>
                  ))}
                </ProductCard.FeatureList>
              </ProductCard.Top>
              <ProductCard.Action>Link</ProductCard.Action>
            </ProductCard.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
