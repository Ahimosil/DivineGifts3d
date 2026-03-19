import { Heart, Printer, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DivineGifts3D</h1>
          <p className="text-xl text-muted-foreground">
            Where creativity meets precision in 3D printing
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                DivineGifts3D was born from a passion for creativity and innovation in 3D printing. 
                What started as a hobby of creating unique 3D-printed items for friends and 
                family has blossomed into a full-fledged business dedicated to bringing joy 
                through personalized creations.
              </p>
              <p className="text-muted-foreground">
                We believe that the best gifts are those made with care and attention to detail. 
                That's why every piece we create is crafted with precision using professional 
                3D printing technology, ensuring the highest quality for our customers.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736667117808-d8e33a51cd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZXIlMjBwcmludGluZyUyMG9iamVjdHxlbnwxfHx8fDE3NjczODE2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="3D Printing"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Passion for Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Every product is created with meticulous attention to detail and genuine care, 
                  ensuring a handmade feel in every piece.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                  <Printer className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Quality & Precision</h3>
                <p className="text-muted-foreground">
                  Using high-quality 3D printers and eco-friendly PLA materials to 
                  deliver exceptional quality in every print.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Affordable Excellence</h3>
                <p className="text-muted-foreground">
                  We believe premium quality shouldn't come with premium prices. Our goal is to 
                  make beautiful 3D-printed items accessible to everyone.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We work closely with customers to ensure 
                  every order meets and exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-gradient-to-br from-teal-50 to-orange-50 p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="mb-2">Ready-Made Products</h3>
              <p className="text-muted-foreground">
                Browse our curated collection of gifts, toys, and home décor items
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-2">Custom Prints</h3>
              <p className="text-muted-foreground">
                Bring your unique ideas to life with our custom printing service
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-2">Personalization</h3>
              <p className="text-muted-foreground">
                Add names, messages, or custom designs to make gifts extra special
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-xl mb-6">
            Ready to create something amazing together?
          </p>
          <a
            href="https://wa.me/919791939527"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}