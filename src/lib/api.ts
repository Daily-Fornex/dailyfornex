import { gql } from "@apollo/client";
import { client } from "./apollo-client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  color?: string;
}

export async function getLatestPosts(params: { first?: number; after?: number } = {}) {
  const { first = 20, after = 0 } = params;
  const { data } = await client.query({
    query: gql`
      query GetLatestPosts($first: Int!, $after: Int!) {
        posts(first: $first, where: { offsetPagination: { offset: $after, size: $first } }) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
    variables: { first, after },
  });

  return data.posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const { data } = await client.query({
    query: gql`
      query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          date
          excerpt
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          comments(where: {status: APPROVE}) {
            nodes {
              id
              content
              date
              author {
                node {
                  name
                  email
                  isRestricted
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  return data.post;
}

export async function getCategories() {
  const { data } = await client.query({
    query: gql`
      query GetCategories {
        categories(first: 100) {
          nodes {
            id
            name
            slug
          }
        }
      }
    `,
  });

  return data.categories.nodes;
}

export async function getPostsByCategory(categorySlug: string, limit: number = 20, offset: number = 0) {
  const { data } = await client.query({
    query: gql`
      query GetPostsByCategory($categorySlug: String!, $limit: Int!, $offset: Int!) {
        posts(where: { categoryName: $categorySlug }, first: $limit, offset: $offset) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
    variables: { categorySlug, limit, offset },
  });

  return data.posts.nodes;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await client.query({
    query: gql`
      query GetCategoryBySlug($slug: ID!) {
        category(id: $slug, idType: SLUG) {
          id
          name
          slug
          count
        }
      }
    `,
    variables: { slug },
  });

  return data.category;
}

export async function getAllCategories(): Promise<Category[]> {
  const { data } = await client.query({
    query: gql`
      query GetAllCategories {
        categories(first: 100) {
          nodes {
            id
            name
            slug
            count
            featuredImage {
              node {
                sourceUrl
              }
            }
            color
          }
        }
      }
    `,
  });

  return data.categories.nodes;
}

export async function searchPosts(searchTerm: string, first: number = 10) {
  const { data } = await client.query({
    query: gql`
      query SearchPosts($searchTerm: String!, $first: Int!) {
        posts(first: $first, where: { search: $searchTerm }) {
          nodes {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
    variables: { searchTerm, first },
  });

  return data.posts.nodes;
}

export async function submitComment(postId: string, name: string, email: string, content: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post: postId,
      author_name: name,
      author_email: email,
      content: content,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit comment');
  }

  return await response.json();
}
