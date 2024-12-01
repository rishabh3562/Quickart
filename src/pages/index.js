import { ArrowRight, Shield, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
// SEO
const Home = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Dedicated support anytime',
    },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      price: 299.99,
    },
    {
      id: '2',
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      price: 199.99,
    },
  ];

  return (
    <div>
      <SEO />
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920"
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Premium Tech Products
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Experience the future with our curated selection of premium technology products.
            </p>
            <Link href="/products">
              <button className="bg-black text-white font-semibold py-3 px-6 rounded-lg flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products#${product.id}`}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-200">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-offWhite2 text-primary-foreground">
        <div className="container mx-auto px-4 text-center flex flex-col items-center ">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our collection of premium tech products today.
          </p>
          <Link href="/products">
            <button className="bg-black text-white  font-semibold py-3 px-6 rounded-lg flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
