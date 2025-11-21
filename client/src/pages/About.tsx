export default function About(){
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About MODERNSTORE</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where contemporary design meets timeless elegance
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded with a passion for contemporary fashion, MODERNSTORE has been redefining 
                the way people dress since day one. We believe that fashion is more than just 
                clothing—it's a form of self-expression, a way to tell your story without words.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our journey began with a simple idea: to create a brand that combines cutting-edge 
                design with exceptional quality, all while remaining accessible to fashion enthusiasts 
                around the world.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we continue to push boundaries, exploring new materials, techniques, and styles 
                to bring you collections that are both innovative and timeless.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Fashion store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              
              <h3 className="text-2xl font-bold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                Every piece is crafted with meticulous attention to detail, using only the finest materials.
              </p>
            </div>
            <div className="text-center">
             
              <h3 className="text-2xl font-bold mb-3">Sustainable</h3>
              <p className="text-muted-foreground">
                We're committed to sustainable practices and ethical manufacturing processes.
              </p>
            </div>
            <div className="text-center">
              
              <h3 className="text-2xl font-bold mb-3">Innovative</h3>
              <p className="text-muted-foreground">
                Constantly evolving, we blend classic styles with modern trends to create unique pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions? Want to learn more about our collections? We'd love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="mailto:contact@modernstore.com" className="text-lg hover:text-accent transition-colors">
              shefket.must@gmail.com
            </a>
            <span className="hidden md:inline">•</span>
            <a href="tel:+1234567890" className="text-lg hover:text-accent transition-colors">
              +359 89 422 9461
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
