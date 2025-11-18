const THEME_STORAGE_KEY = "theme";

export default function ThemeScript() {
  const script = `
    (function() {
      try {
        var stored = window.localStorage.getItem('${THEME_STORAGE_KEY}');
        var parsed = stored ? JSON.parse(stored) : null;
        var mode = parsed && parsed.mode ? parsed.mode : 'dark';
        if (mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

