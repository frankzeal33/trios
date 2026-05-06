import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FormField from "@/components/FormField";

const MAX_TICKETS = 10;

export type Ticket = {
  id: string;
  name: string;
  price: string;
};

interface TicketListProps {
  tickets: Ticket[];
  onChange: (tickets: Ticket[]) => void;
}

export default function TicketList({ tickets, onChange }: TicketListProps) {
  const addTicket = (): void => {
    if (tickets.length >= MAX_TICKETS) {
      Alert.alert("Limit reached", `You can only add up to ${MAX_TICKETS} ticket types.`);
      return;
    }
    onChange([
      ...tickets,
      { id: Date.now().toString(), name: "", price: "" },
    ]);
  };

  const removeTicket = (id: string): void => {
    onChange(tickets.filter((t) => t.id !== id));
  };

  const updateTicket = (id: string, field: keyof Omit<Ticket, "id">, value: string): void => {
    onChange(tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const clearAll = (): void => {
    Alert.alert("Clear all tickets?", "This will remove all ticket types.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear all", style: "destructive", onPress: () => onChange([]) },
    ]);
  };

  const slotsLeft = MAX_TICKETS - tickets.length;
  const isFull = tickets.length >= MAX_TICKETS;

  return (
    <View className="w-full mt-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-1">
          <Text className="text-base font-pregular">Ticket Types</Text>
          <Text className="text-xs font-pregular text-gray-400 mt-0.5">
            You can add up to {MAX_TICKETS} ticket types
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          {/* Count badge */}
          <View className="bg-gray-100 rounded-full px-3 py-1">
            <Text className="text-xs font-pmedium text-gray-500">
              {tickets.length} / {MAX_TICKETS}
            </Text>
          </View>
          {/* Clear all */}
          {tickets.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={clearAll}
              className="border border-red-400 rounded-xl px-3 py-1"
            >
              <Text className="text-xs font-pmedium text-red-400">Clear all</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Ticket rows */}
      {tickets.map((ticket, index) => (
        <View key={ticket.id} className="w-full mt-3">
          {/* Row label + remove */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-xs font-pmedium text-gray-400">
              Ticket {index + 1}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => removeTicket(ticket.id)}
              className="flex-row items-center gap-1"
            >
              <MaterialCommunityIcons name="close-circle-outline" size={14} color="#f87171" />
              <Text className="text-xs font-pmedium text-red-400">Remove</Text>
            </TouchableOpacity>
          </View>

          {/* Fields */}
          <View className="w-full flex-row items-center justify-between">
            <FormField
              title="Ticket name"
              value={ticket.name}
              placeholder="e.g VIP"
              handleChangeText={(e: string) => updateTicket(ticket.id, "name", e)}
              otherStyles="w-[49%]"
            />
            <FormField
              title="Price"
              value={ticket.price}
              placeholder="Enter here"
              handleChangeText={(e: string) => updateTicket(ticket.id, "price", e)}
              otherStyles="w-[49%]"
              keyboardType="numeric"
            />
          </View>

          {/* Divider — skip after last item */}
          {index < tickets.length - 1 && (
            <View className="border-b border-gray-100 mt-3" />
          )}
        </View>
      ))}

      {/* Empty state */}
      {tickets.length === 0 && (
        <View className="border border-dashed border-gray-300 rounded-2xl py-6 items-center justify-center bg-gray-50 mt-2">
          <Ionicons name="ticket-outline" size={28} color="#d1d5db"/>
          <Text className="text-sm font-pregular text-gray-400 mt-2">No ticket types added yet</Text>
        </View>
      )}

      {/* Add button */}
      {!isFull && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={addTicket}
          className="flex-row items-center justify-center gap-2 border border-dashed border-black rounded-2xl py-3 mt-4"
        >
          <View className="items-center justify-center size-6 rounded-full bg-orangeLight">
            <MaterialCommunityIcons name="plus" size={14} color="#FF6600" />
          </View>
          <Text className="text-sm font-psbold">
            Add ticket type
            {tickets.length > 0 ? ` · ${slotsLeft} left` : ""}
          </Text>
        </TouchableOpacity>
      )}

      {isFull && (
        <Text className="text-xs font-pmedium text-gray-400 text-center mt-3">
          Maximum ticket types reached
        </Text>
      )}
    </View>
  );
}