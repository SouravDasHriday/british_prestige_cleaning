import Image from "next/image";

interface PageHeroProps {
  title: string;
  highlight?: string;
  description: string;
  image: string;
}

export function PageHero({ title, highlight, description, image }: PageHeroProps) {
  return (
    <section className="w-full relative pt-32 lg:pt-40 pb-20 lg:pb-32 min-h-[50vh] flex flex-col justify-center bg-slate-950 overflow-hidden">
      {/* Background Image Watermark */}
      <div className="absolute inset-0 opacity-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-transparent" />

      {/* Content */}
      <div className="container-wide mx-auto relative z-10 px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {title}{" "}
            {highlight && <span className="text-emerald-400">{highlight}</span>}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
