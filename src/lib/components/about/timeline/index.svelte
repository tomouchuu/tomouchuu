<script lang="ts">
  import { onMount } from 'svelte'
  import { fetchPersonalData, type WorkItem } from '$lib/queries/personal'
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  let status = $state<'pending' | 'success' | 'error'>('pending')
  let work = $state<WorkItem[]>([])

  onMount(async () => {
    try {
      const data = await fetchPersonalData()
      work = data?.work ?? []
      status = 'success'
    } catch (e) {
      status = 'error'
    }
  })
</script>

<div>
  <h2 class="text-2xl font-semibold mb-4">History</h2>

  {#if status === 'pending'}
    <div class="space-y-4">
      <Skeleton class="h-6 w-40" />
      <div class="space-y-3">
        {#each Array(4) as _, index (index)}
          <div class="flex items-start space-x-4">
            <div class="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
            <div class="flex-1">
              <Skeleton class="h-5 w-64" />
              <Skeleton class="h-4 w-40 mt-2" />
              <Skeleton class="h-4 w-full mt-2" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if status === 'error'}
    <p>Could not load timeline.</p>
  {:else}
    <ol class="relative border-s border-muted-foreground/30 ml-2">
      {#each work as item (item.company + item.date)}
        <li class="mb-6 ms-6 last:mb-0">
          <span class="absolute -start-1.5 mt-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-background ring-4 ring-background">
            <span class="h-2 w-2 rounded-full bg-primary"></span>
          </span>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <h3 class="font-medium">
                {item.title}
                {item.company && ' @ '}
                {#if item.url}
                  <a href={item.url} target="_blank" rel="noopener" class="hover:underline">{item.company}</a>
                {:else}
                  {item.company}
                {/if}
              </h3>
            </div>
            <time class="text-sm text-muted-foreground">{item.date}</time>
            {#if item.description}
              <p class="mt-2 text-sm leading-relaxed">{item.description}</p>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
  {/if}
</div>
