import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface OpenLibraryDocument {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

interface OpenLibrarySearchResponse {
  docs: OpenLibraryDocument[];
}

export interface OpenLibraryBookResult {
  source: 'openlibrary';
  openLibraryWorkId: string;
  title: string;
  author: string;
  cover: string | null;
}

@Injectable()
export class OpenLibraryService {
  constructor(private readonly configService: ConfigService) {}

  private async fetchWithRetry(url: URL): Promise<Response> {
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': this.configService.getOrThrow<string>(
              'OPEN_LIBRARY_USER_AGENT',
            ),
            Accept: 'application/json',
          },
        });
        return response;
      } catch (error) {
        if (maxAttempts === attempt) {
          console.error('Open Library fetch failed:', error);
          throw new BadGatewayException('Could not connect to Open Library');
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    throw new BadGatewayException('Could not connect to Open Library');
  }

  async searchBooks(query: string): Promise<OpenLibraryBookResult[]> {
    const apiUrl = this.configService.getOrThrow<string>(
      'OPEN_LIBRARY_API_URL',
    );
    const url = new URL(apiUrl);

    url.searchParams.set('q', query);
    url.searchParams.set('fields', 'key,title,author_name,cover_i');
    url.searchParams.set('limit', '10');

    const response = await this.fetchWithRetry(url);
    if (!response.ok)
      throw new BadGatewayException(
        'Open Library could not complete the book search',
      );

    const data = (await response.json()) as OpenLibrarySearchResponse;

    return data.docs.map<OpenLibraryBookResult>((document) => ({
      source: 'openlibrary',
      openLibraryWorkId: document.key,
      title: document.title,
      author: document.author_name?.join(', ') ?? 'Unknown author',
      cover:
        document.cover_i !== undefined
          ? `https://covers.openlibrary.org/b/id/${document.cover_i}-M.jpg?default=false`
          : null,
    }));
  }
}
