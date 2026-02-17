import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

interface SkeletonLoaderProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  height = 20,
  width: customWidth = "100%",
  borderRadius = 8,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        {
          height,
          width: customWidth,
          borderRadius,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={["#E5E7EB", "#F3F4F6", "#E5E7EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export const MatchCardSkeleton: React.FC = () => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <SkeletonLoader width={100} height={16} />
        <SkeletonLoader width={60} height={14} />
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-1 items-center">
          <SkeletonLoader width={50} height={50} borderRadius={25} />
          <SkeletonLoader width={80} height={14} style={{ marginTop: 8 }} />
        </View>

        <View className="items-center px-4">
          <SkeletonLoader width={60} height={24} />
          <SkeletonLoader width={40} height={12} style={{ marginTop: 4 }} />
        </View>

        <View className="flex-1 items-center">
          <SkeletonLoader width={50} height={50} borderRadius={25} />
          <SkeletonLoader width={80} height={14} style={{ marginTop: 8 }} />
        </View>
      </View>
    </View>
  );
};

export const MatchListSkeleton: React.FC = () => {
  return (
    <View className="flex-1 pt-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <MatchCardSkeleton key={item} />
      ))}
    </View>
  );
};
