function getTitle(input) {
  const title = input.match(/<title[^>]*>([^<]+)<\/title>/);
  if (title) {
    return title[1];
  }
  return undefined;
}

export default function followRedirects({ url, title }) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve();
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const resolvedUrl = xhr.responseURL || url;
          const resolvedTitle = getTitle(xhr.responseText) || title;
          resolve({
            url: resolvedUrl,
            title: resolvedTitle,
          });
        }
      };
      xhr.open('GET', url, true);
      try {
        xhr.send();
      } catch (e) {
        reject(e);
      }
    }
  });
}
