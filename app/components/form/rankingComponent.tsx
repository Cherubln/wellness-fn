import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Question } from "@/costants";

const RankingComponent = ({
  quest,
  value,
  handleInputArrayValue,
}: {
  quest: Question;
  value?: string[];
  handleInputArrayValue: (id: number, value: string[]) => void;
}) => {
  const [items, setItems] = useState(value ?? []);
  const [updatedItems, setUpdatedItems] = useState<string[] | null>(null);

  useEffect(() => {
    // Only update if updatedItems has changed
    if (
      updatedItems !== null &&
      !updatedItems.every((item, index) => item === items[index])
    ) {
      handleInputArrayValue(quest.id, updatedItems);
    }
  }, [updatedItems, quest.id, handleInputArrayValue, items]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      const newItems = arrayMove(prev, oldIndex, newIndex);

      // Only update updatedItems if new order is different from current
      if (JSON.stringify(newItems) !== JSON.stringify(items)) {
        setUpdatedItems(newItems);
      }
      return newItems;
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={
        [
          /* Add modifiers for mobile touch events if needed */
        ]
      }
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2 bg-white p-4 rounded-lg shadow-md">
          {items.map((item) => (
            <SortableItem key={item} id={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

const SortableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 border rounded bg-gray-100 text-slate-600 w-fit cursor-pointer touch-action-none" // Ensuring touch events are handled correctly
    >
      {id}
    </li>
  );
};

export default RankingComponent;
