<template>
  <!-- Main page container -->
  <div class="container mx-auto py-8 max-w-5xl">
    <!-- H1 heading outside the card -->
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)]"
    >
      Binance Red Packet
    </h1>

    <section
      class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg motion-safe:animate-fade-in-up"
    >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        🧧 What is Binance Red Packet?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Binance Red Packet is a feature that allows you to share crypto with friends and family. It's similar to the tradition of giving red envelopes during celebrations, but with cryptocurrency instead of cash.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        I created this page to help you understand how Binance Red Packet works and make it easier to share with others.
      </p>
      <div class="flex flex-wrap gap-4 mt-2">
        <a href="https://www.binance.com/en/support/faq/detail/6202e6d8dd5b4119801e0e2ecea22790" 
           target="_blank" 
           class="text-blue-500 hover:underline inline-block">
          Official Binance Red Packet Guide →
        </a>
      </div>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg flex flex-col items-center">
      <p class="mb-2 text-gray-600 dark:text-gray-400">Direct link:</p>
      <a href="https://s.binance.com/BEsVAbTg?utm_medium=web_share_copy" 
           target="_blank" 
           class="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded transition duration-300 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
          <path d="M11 17H7q-2.075 0-3.537-1.463T2 12q0-2.075 1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4v2Zm-3-4v-2h8v2H8Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12q0 2.075-1.463 3.538T17 17h-4Z"/>
        </svg>
        Claim Red Packet Now!
      </a>
    </section>

    <!-- Red Packet Example Image -->
    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      
      <div class="flex flex-col items-center mb-6">
        <img @click="copyCode" src="/red-packet.png" alt="Binance Red Packet Example" class="rounded-xl shadow-lg max-w-xs w-full mb-6" />
        
        <div class="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">Red Packet Code:</p>
          <div class="flex">
            <code class="bg-white dark:bg-gray-900 p-3 rounded text-xl font-mono flex-grow text-center">BP6OJOBZM7</code>
            <button @click="copyCode" class="ml-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        🎁 How to Claim a Red Packet
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        When someone shares a Red Packet with you, there are two easy ways to claim it:
      </p>
      <ol class="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400 ml-4">
        <li><strong>Using the Code:</strong>
          <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Open your <strong>Binance App</strong> and go to the <strong>Pay</strong> section</li>
            <li>Tap on <strong>Red Packet</strong></li>
            <li>Select <strong>Receive</strong> and choose <strong>Via Code</strong></li>
            <li>Enter the Red Packet code (like <code class="bg-white dark:bg-gray-900 p-1 rounded text-sm font-mono">BP6OJOBZM7</code>)</li>
            <li>Tap <strong>Claim</strong> to receive the crypto</li>
          </ul>
        </li>
        <li class="mt-4"><strong>Using the QR Code:</strong>
          <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Open your <strong>Binance App</strong></li>
            <li>Tap the <strong>Scan</strong> icon in the top-right corner</li>
            <li>Scan the QR code from the Red Packet</li>
            <li>Confirm to claim your crypto</li>
          </ul>
        </li>
        <li class="mt-4"><strong>Using Direct Link:</strong>
          <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Click the <strong>Claim This Red Packet Now</strong> button above</li>
            <li>If you have the Binance App installed, it will open automatically</li>
            <li>Follow the on-screen instructions to claim your crypto</li>
          </ul>
        </li>
      </ol>
      <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
        After claiming, the crypto will be immediately deposited into your Binance wallet. Remember that Red Packets often have limited quantities, so claim them quickly!
      </p>
    </section>
    
    <div class="mt-8 text-center">
      <NuxtLink
        to="/"
        class="inline-block bg-yellow-500 hover:bg-yellow-400 text-[var(--color-letters)] font-bold py-2 px-6 rounded-lg transition duration-300"
      >
        Back to WODL Solver
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const copyCode = () => {
  navigator.clipboard.writeText('BP6OJOBZM7')
    .then(() => {
      alert('Code copied to clipboard!')
    })
    .catch(err => {
      console.error('Failed to copy: ', err)
    })
}

useSeoMeta({
  title: "Binance Red Packet - Share & Receive Crypto Gifts",
  description: "Learn how to use Binance Red Packet to share cryptocurrency gifts with friends. I created this guide to help Binance users share crypto easily.",
  ogTitle: "Binance Red Packet Guide | Share Crypto Gifts",
  ogDescription: "Simple guide to Binance Red Packet feature. Learn how to send and receive cryptocurrency gifts through Binance's digital red envelopes.",
  keywords: "Binance Red Packet, crypto red envelope, Binance gift, send crypto gift, share cryptocurrency, Binance Red Packet code, crypto gift guide",
});

// Add JSON-LD structured data for better SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Create and Share a Binance Red Packet",
        "description": "A step-by-step guide on how to send and receive cryptocurrency gifts using Binance Red Packet feature.",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Open your Binance App and go to the Pay section"
          },
          {
            "@type": "HowToStep",
            "text": "Tap on Red Packet and choose Send"
          },
          {
            "@type": "HowToStep",
            "text": "Select the cryptocurrency you want to share"
          },
          {
            "@type": "HowToStep",
            "text": "Choose between Random or Fixed amounts"
          },
          {
            "@type": "HowToStep",
            "text": "Set the number of packets and amount"
          },
          {
            "@type": "HowToStep",
            "text": "Add an optional message and tap Send"
          },
          {
            "@type": "HowToStep",
            "text": "Share the Red Packet link or code with friends"
          }
        ]
      })
    }
  ]
})
</script>

<style scoped>
.poster-row {
  position: relative;
  color: #333;
}
</style> 