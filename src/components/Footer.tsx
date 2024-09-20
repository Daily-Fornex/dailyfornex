import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { name: 'Facebook', icon: '/facebook.png', url: 'https://fb.com/dailyfornex' },
  { name: 'Twitter', icon: '/twitter.png', url: 'https://twitter.com/dailyfornex' },
  { name: 'Instagram', icon: '/instagram.png', url: 'https://instagram.com/dailyfornex' },
  { name: 'Pinterest', icon: '/pinterest.png', url: 'https://pinterest.com/dailyfornex' },
  { name: 'YouTube', icon: '/youtube.png', url: 'https://youtube.com/dailyfornex' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <Image src="/logo.webp" alt="Daily Fornex Logo" width={150} height={50} className="mb-4" />
            <p className="mb-2">Your every feedback is important.</p>
            <p>Kindly email us at: <a href="mailto:admin@dailyfornex.com" className="text-blue-500 hover:underline">admin@dailyfornex.com</a></p>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Part */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Daily Fornex All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                <Image src={social.icon} alt={`${social.name} icon`} width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}