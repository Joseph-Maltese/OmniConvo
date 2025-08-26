//
'use server';
//export const runtime = 'nodejs';
//new import for cheerio
import {load} from 'cheerio';

import type { Conversation } from '@/types/conversation';

/**
 * Extracts a ChatGPT share page into a structured Conversation.
 * TODO jm: write logic here
 * turn string to DOM and parse out the relevant pieces
 */
//first method
export async function parseChatGPT(html: string): Promise<Conversation> {
  const $ = load(html);


  //find conversation div by class
  const conversationDiv = $('div[class*="@thread-xl/thread:pt-header-height"][class*="flex"][class*="flex-col"][class*="text-sm"][class*="pb-25"]').first();

  //Remove interactive elements inside the conversation div
  conversationDiv.find('button, input, textarea, select').remove();

  // Get the cleaned HTML
  //const conversationHtml = conversationDiv.html() || '';
  const conversationHtml = `<div style="color: #6b7280;">${conversationDiv.html() || ''}</div>`;

  return {
    model: 'ChatGPT',
    content: conversationHtml,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };

  //OLD; function initially only consisted of the following
  return {
    model: 'ChatGPT',
    //pass the input for content
    content: html,
    scrapedAt: new Date().toISOString(),
    sourceHtmlBytes: html.length,
  };
  
}

//second method:
/*export async function parseChatGPT(html: string): Promise<Conversation> {
  // Parse the HTML string into a DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Find the conversation div by class (all classes must match)
  const conversationDiv = Array.from(doc.querySelectorAll('div')).find(div =>
    div.className.includes('@thread-xl/thread:pt-header-height') &&
    div.className.includes('flex') &&
    div.className.includes('flex-col') &&
    div.className.includes('text-sm') &&
    div.className.includes('pb-25')
  );

  if (conversationDiv) {
    // Remove all interactive elements
    ['button', 'input', 'textarea', 'select'].forEach(selector => {
      conversationDiv.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Get the cleaned HTML
    //const conversationHtml = conversationDiv.innerHTML;
    const conversationHtml = `<div style="color: #6b7280;">${conversationDiv.innerHTML}</div>`;

    return {
      model: 'ChatGPT',
      content: conversationHtml,
      scrapedAt: new Date().toISOString(),
      sourceHtmlBytes: html.length,
    };
  } else {
    // Fallback if not found
    return {
      model: 'ChatGPT',
      content: '',
      scrapedAt: new Date().toISOString(),
      sourceHtmlBytes: html.length,
    };
  }
}*/
