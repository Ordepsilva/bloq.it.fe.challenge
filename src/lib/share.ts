interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

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
    // TODO: Toast error
  }
}
