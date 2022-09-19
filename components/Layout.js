import Dynamic from "next/dynamic";
import Link from 'next/link';

const ThemeToggle = Dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
});

const Layout = ({isLocal = false, ...props}) => {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-neutral-900 dark:text-white">
      {!isLocal && (
        <div className="pt-4 px-4 flex items-center justify-between">
          <Link href="/" className="text-xl"><a className="text-2xl">Back</a></Link>
          <ThemeToggle />
        </div>
      )}
      <div {...props} />
    </div>
  );
}

export default Layout;