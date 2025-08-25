import type { Conversation } from '@/types/conversation';
//new import for cheerio
import * as cheerio from 'cheerio';

/**
 * Extracts a ChatGPT share page into a structured Conversation.
 * TODO jm: write logic here
 * turn string to DOM and parse out the relevant pieces
 */
export async function parseChatGPT(html: string): Promise<Conversation> {
  const $ = cheerio.load(html);


  //find conversation div by class
  const conversationDiv = $('div[class*="@thread-xl/thread:pt-header-height"][class*="flex"][class*="flex-col"][class*="text-sm"][class*="pb-25"]').first();

  //Remove interactive elements inside the conversation div
  conversationDiv.find('button, input, textarea, select').remove();

  // Get the cleaned HTML
  const conversationHtml = conversationDiv.html() || '';

  return {
    model: 'ChatGPT',
    content: conversationHtml,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };

  /*OLD; function initially only consisted of the following
  return {
    model: 'ChatGPT',
    //pass the input for content
    content: html,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };
  */
}
