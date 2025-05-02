import React from "react";

const HomeProducts = () => {
  const categories = [
    {
      id: 1,
      name: "GPT Models",
      desc: "Fine-tuned language models",
      count: 156,
      icon: "🧠",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Prompts",
      desc: "Advanced AI instructions",
      count: 423,
      icon: "📝",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Chatbots",
      desc: "Configurable AI assistants",
      count: 82,
      icon: "💬",
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Data Analysis",
      desc: "Models for working with data",
      count: 64,
      icon: "📊",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-medium">
          AI Model <span className="text-primary">Categories</span>
        </h2>
        <div className="w-28 h-0.5 bg-primary mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-background rounded-lg overflow-hidden text-white hover:shadow-lg hover:shadow-primary/20 transition"
          >
            <div
              className={`${category.color} p-4 flex items-center justify-between`}
            >
              <h3 className="text-xl font-bold">{category.name}</h3>
              <span className="text-3xl">{category.icon}</span>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-3">{category.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">
                  {category.count} available
                </span>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-white hover:bg-primary px-3 py-1 rounded-full border border-primary transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProducts;
