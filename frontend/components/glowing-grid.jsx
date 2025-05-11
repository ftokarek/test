'use client';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Button } from '@/components/ui/button';
export function GlowingEffectDemo() {
  const categories = [
    {
      id: 1,
      name: 'GPT Models',
      desc: 'Fine-tuned language models',
      count: 156,
      icon: '🧠',
    },
    {
      id: 2,
      name: 'Prompts',
      desc: 'Advanced AI instructions',
      count: 423,
      icon: '📝',
    },
    {
      id: 3,
      name: 'Chatbots',
      desc: 'Configurable AI assistants',
      count: 117,
      icon: '💬',
    },
    {
      id: 4,
      name: 'Data Analysis',
      desc: 'Models for working with data',
      count: 64,
      icon: '📊',
    },
    {
      id: 5,
      name: 'Image Generation',
      desc: 'Models for generating images',
      count: 32,
      icon: '🎨',
    },
  ];

  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<span className="text-2xl">{categories[0].icon}</span>}
        title={categories[0].name}
        description={categories[0].desc}
        count={categories[0].count}
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<span className="text-2xl">{categories[1].icon}</span>}
        title={categories[1].name}
        description={categories[1].desc}
        count={categories[1].count}
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<span className="text-2xl">{categories[2].icon}</span>}
        title={categories[2].name}
        description={categories[2].desc}
        count={categories[2].count}
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<span className="text-2xl">{categories[3].icon}</span>}
        title={categories[3].name}
        description={categories[3].desc}
        count={categories[3].count}
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<span className="text-2xl">{categories[4].icon}</span>}
        title={categories[4].name}
        description={categories[4].desc}
        count={categories[4].count}
      />
    </ul>
  );
}

const GridItem = ({ area, icon, title, description, count }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-neutral-800 bg-black p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={4}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-6 md:p-6">
          <div>
            <h3 className="text-4xl font-bold text-center text-violet-300 mt-6">
              {title}
            </h3>
            <p className="text-sm text-neutral-400 text-center mt-2">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-sm">
                {count} available
              </span>
            </div>
            <Button className="text-sm">View</Button>
          </div>
        </div>
      </div>
    </li>
  );
};
