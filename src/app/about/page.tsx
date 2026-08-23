export const metadata = { title: 'About — HS Shoes', description: 'HS Shoes — Crafted to Be Remembered. Our story of luxury footwear craftsmanship.' };
export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="container-lux py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-ash mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl mb-8 text-balance">Crafted to Be Remembered.</h1>
          <p className="text-ash text-lg leading-relaxed mb-6">
            HS Shoes was founded on a simple principle: that luxury should not be loud, but felt.
            Every pair we create is an expression of restraint, quality, and timeless design.
          </p>
          <p className="text-ash text-lg leading-relaxed mb-12">
            From the selection of premium full-grain leather to the final hand-burnished finish,
            each step in our process is an act of dedication to the art of shoemaking.
            We believe a great shoe is not just worn—it is remembered.
          </p>
        </div>
      </section>
      <section className="bg-stone py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div><p className="font-display text-4xl mb-2">72h</p><p className="text-xs uppercase tracking-widest text-ash">Per Pair</p></div>
          <div><p className="font-display text-4xl mb-2">100%</p><p className="text-xs uppercase tracking-widest text-ash">Hand-Finished</p></div>
          <div><p className="font-display text-4xl mb-2">∞</p><p className="text-xs uppercase tracking-widest text-ash">Timeless Design</p></div>
        </div>
      </section>
      <section className="container-lux py-20 md:py-32 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-6">Our Philosophy</h2>
        <p className="text-ash leading-relaxed mb-6">
          We believe that true luxury is found in the details—the weight of a shoe in your hand,
          the texture of the leather, the precision of the stitching. These are the things that
          separate the ordinary from the memorable.
        </p>
        <p className="text-ash leading-relaxed">
          Every HS Shoes product is designed to last—not just in durability, but in style.
          We create footwear that transcends trends, that becomes a part of your story.
        </p>
      </section>
    </div>
  );
}
