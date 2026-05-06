import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import TitleHeader from "@/components/TitleHeader";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";

type Plan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  perks: string[];
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "Free",
    perks: ["+20% event promotion", "+20% advanced analysis"],
  },
  {
    id: "basic",
    name: "Basic Plan",
    price: "₦5,000",
    period: "monthly",
    perks: ["+50% event promotion", "+50% advanced analysis"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₦10,000",
    period: "monthly",
    perks: ["+80% event promotion", "+80% advanced analysis"],
  },
];

export default function SubscriptionPlansScreen() {
  const { bottom, top} = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>("basic");

  return (
    <View className='flex-1 bg-white px-4' style={{ paddingTop: top }}>
        <Header title="Choose Your Plan" showGoBack={true} onpress={() => router.back()}/>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingTop: 8, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan cards */}
        <View className="gap-4">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            const isDark = plan.popular && isSelected;

            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.85}
                onPress={() => setSelected(plan.id)}
                style={{
                  borderRadius: 16,
                  borderWidth: isSelected && !plan.popular ? 1.5 : 0,
                  borderColor: isSelected && !plan.popular ? "#FF6600" : "transparent",
                  backgroundColor: isDark ? "#1a1f1a" : "#E7E7E7",
                  padding: 16,
                  shadowColor: "#000",
                  shadowOpacity: isSelected ? 0.08 : 0.04,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: isSelected ? 4 : 2,
                }}
              >
                <View className="flex-row items-start justify-between gap-2">
                  {/* Left: name + badge + perks */}
                  <View className="flex-1 pr-4">
                    <View className="flex-row items-center gap-2 mb-2 flex-wrap">
                      <Text
                        className="text-lg font-psbold"
                        style={{ color: isDark ? "#fff" : "#000" }}
                      >
                        {plan.name}
                      </Text>
                      {plan.popular && (
                        <View className="bg-orange rounded-full px-3 py-0.5">
                          <Text className="text-white text-xs font-pmedium">
                            Most Popular
                          </Text>
                        </View>
                      )}
                    </View>

                    {plan.perks.map((perk) => (
                      <Text
                        key={perk}
                        className="text-sm font-pregular mb-0.5"
                        style={{ color: isDark ? "rgba(255,255,255,0.75)" : "#555" }}
                      >
                        {perk}
                      </Text>
                    ))}
                  </View>

                  {/* Right: price */}
                  <View className="items-flex-end justify-center">
                    {plan.period ? (
                      <View className="items-end">
                        <Text
                          className="text-2xl font-psbold"
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          {plan.price}/
                        </Text>
                        <Text
                          className="text-sm font-pregular -mt-1"
                          style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#888" }}
                        >
                          {plan.period}
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-2xl font-psbold text-black">
                        {plan.price}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
          
        <Text className="text-xs font-pregular text-center leading-5 mt-8">
          By subscribing, you agree to our{" "}
          <Text className="underline text-gray-700 font-pmedium">Terms & Conditions</Text>
          , and that subscriptions auto-renew until you cancel.{" "}
          <Text className="underline text-gray-700 font-pmedium">Cancel anytime</Text>
          , at least 24 hours prior to renewal to avoid additional charges. Price subject to
          change. Manage your subscription through the platform you subscribed on.
        </Text>
      </ScrollView>

      {/* CTA */}
      <View style={{ paddingBottom: bottom + 8 }}>
        <CustomButton
          title="Proceed to payment"
          containerStyles="w-full mt-4"
          textStyles="text-white"
        />
      </View>
    </View>
  );
}