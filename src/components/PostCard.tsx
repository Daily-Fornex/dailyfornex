import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    date: string;
    categories: {
      nodes: {
        name: string;
        slug: string;
      }[];
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="mb-8">
      <Link href={`/post/${post.slug}`}>
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-lg mb-4"
        />
      </Link>
      <div className="flex items-center mb-2">
        {post.categories.nodes[0] && (
          <Link href={`/category/${post.categories.nodes[0].slug}`} className="text-blue-600 text-sm font-semibold mr-4">
            {post.categories.nodes[0].name}
          </Link>
        )}
        <Image
          src={post.author.node.avatar.url}
          alt={post.author.node.name}
          width={24}
          height={24}
          className="rounded-full mr-2"
        />
        <span className="text-sm text-gray-600">{post.author.node.name}</span>
      </div>
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/post/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <time className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</time>
    </article>
  );
}