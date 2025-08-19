export function CosmicFooter() {
  const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  return (
    <footer className="py-12 px-6 border-t border-border/30 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Zodiac Icons */}
        <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
          {zodiacSigns.map((sign, index) => (
            <span
              key={index}
              className="text-2xl text-primary constellation-glow hover:scale-110 transition-transform cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {sign}
            </span>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-muted-foreground text-sm">
          Built with ❤️ by{' '}
          <span className="text-primary font-medium">Anish Konda</span>
        </p>
        
        <p className="text-xs text-muted-foreground mt-2">
          May the stars guide your journey through the cosmos ✨
        </p>
      </div>

      {/* Background Stars */}
      <div className="absolute top-4 left-1/4 w-1 h-1 bg-primary rounded-full animate-twinkle" />
      <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse" />
    </footer>
  );
}