import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'vue-sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export type ShareOptions = {
  title: string;
  text: string;
  url: string;
};

export async function share({ title, text, url }: ShareOptions) {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });
    } else {
      await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    toast.error('Failed to share');
  }
}

export function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

//Future share functionality
/* export async function sharePokemonCard(cardElement: HTMLElement, pokemonName: string) {
  const canvas = await html2canvas(cardElement);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return;

  const file = new File([blob], `${pokemonName}.png`, { type: 'image/png' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: `Check out my caught Pokémon: ${pokemonName}`,
      text: `Here's my ${pokemonName} card from Pokédex!`,
    });
  } else {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pokemonName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} */
