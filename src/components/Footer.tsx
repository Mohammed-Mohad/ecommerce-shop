export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}