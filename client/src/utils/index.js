import FileSaver from 'file-saver';
import { surprisePrompts } from '../constant';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surprisePrompts.length);
  const randomPrompt = surprisePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(photo) {
  FileSaver.saveAs(photo, `download-${photo}.jpg`);
}
