export default function Footer() {
  return (
    <footer className="py-6 bg-muted/30 text-center text-sm text-muted-foreground mt-20 relative z-40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-2">
        <p>© {new Date().getFullYear()} Rıdvan Yiğit. All rights reserved.</p>
        <a
          href="/impressum"
          className="underline hover:text-indigo-600 transition"
        >
          Impressum
        </a>
      </div>
    </footer>
  );
}
