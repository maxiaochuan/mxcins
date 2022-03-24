import { tw, apply } from 'twind';

export default () => {
  const setDark = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => setDark()}>dark mode on</button>
      </div>
      <span className={tw(apply(`bg-white font-normal dark:bg-black transition`))}>zhengwen</span>
    </div>
  );
};
