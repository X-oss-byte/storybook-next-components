import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import DirectoryTree from "directory-tree";
import { getFilePaths } from "../../utils";
import React from "react";
import StoryData from "../../storybook-components-to-next.config";
import {
  Center,
  VStack,
  Heading,
  Box,
  Text,
  HStack,
  Button,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  GluestackUIProvider,
  Image,
} from "@gluestack-ui/themed";
import { View } from "react-native";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  Pressable,
  Icon,
  CloseIcon,
} from "@gluestack-ui/themed";

interface Option {
  control: string;
  options: string[];
  figmaIgnore: boolean;
  description: string;
  table: {
    defaultValue: {
      summary: string;
    };
  };
}

interface Options {
  [key: string]: Option;
}

interface Combination {
  x;
  [key: string]: string;
}

const STATE_PROPERTIES = [
  "isHovered",
  "isPressed",
  "isFocused",
  "isFocusVisible",
  "isDisabled",
  "isInvalid",
  "isReadonly",
  "isRequired",
];

function generateCombinations(
  combinations: Combination[],
  options: Options,
  index: number,
  combination: Combination
) {
  if (index === Object.keys(options).length) {
    combinations.push(combination);
    return;
  }

  const optionKey = Object.keys(options)[index];
  const optionValues = options[optionKey].options;

  if (
    optionValues &&
    optionValues.length > 0 &&
    !options[optionKey].figmaIgnore
  ) {
    for (let i = 0; i < optionValues.length; i++) {
      const newCombination: Combination = { ...combination };

      newCombination[optionKey] = optionValues[i];
      generateCombinations(combinations, options, index + 1, newCombination);
    }
  } else {
    generateCombinations(combinations, options, index + 1, combination);
  }
}

interface ExplorePageProps {
  slug: string;
}
const GluestackLogo = () => {
  return (
    <svg
      width="153"
      height="28"
      viewBox="0 0 153 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7.6689L9.99995 0.302963V3.77912L0 11.145V7.6689Z"
        fill="black"
      ></path>
      <path
        d="M20 7.66889L10.0001 0.302956V3.77911L20 11.145V7.66889Z"
        fill="black"
      ></path>
      <path
        d="M0 15.6689L9.99995 8.30296V11.7791L0 19.145V15.6689Z"
        fill="black"
      ></path>
      <path
        d="M20 15.6689L10.0001 8.30295V11.7791L20 19.145V15.6689Z"
        fill="black"
      ></path>
      <path
        d="M5.25 11.9603L14 5.51508V8.55671L5.25 15.0019V11.9603Z"
        fill="black"
      ></path>
      <path
        d="M22.75 11.9603L14 5.51508V8.55671L22.75 15.0019V11.9603Z"
        fill="black"
      ></path>
      <path
        d="M5.25 18.9603L14 12.5151V15.5567L5.25 22.0019V18.9603Z"
        fill="black"
      ></path>
      <path
        d="M22.75 18.9603L14 12.5151V15.5567L22.75 22.0019V18.9603Z"
        fill="black"
      ></path>
      <rect width="28" height="28" rx="2" fill="black"></rect>
      <path
        d="M6 12.3559L13.9998 6.46325V9.24413L6 15.1368V12.3559Z"
        fill="white"
      ></path>
      <path
        d="M22 12.356L14.0002 6.46332V9.24419L22 15.1368V12.356Z"
        fill="white"
      ></path>
      <path
        d="M6 18.7558L13.9998 12.8632V15.6441L6 21.5367V18.7558Z"
        fill="white"
      ></path>
      <path
        d="M22 18.7559L14.0002 12.8632V15.6441L22 21.5367V18.7559Z"
        fill="white"
      ></path>
      <path
        d="M46.792 26.724C45.848 26.724 44.976 26.572 44.176 26.268C43.376 25.964 42.688 25.54 42.112 24.996C41.536 24.468 41.104 23.844 40.816 23.124L43.312 22.092C43.536 22.7 43.944 23.204 44.536 23.604C45.144 24.004 45.888 24.204 46.768 24.204C47.456 24.204 48.072 24.068 48.616 23.796C49.16 23.54 49.592 23.156 49.912 22.644C50.232 22.148 50.392 21.548 50.392 20.844V17.916L50.872 18.468C50.424 19.3 49.8 19.932 49 20.364C48.216 20.796 47.328 21.012 46.336 21.012C45.136 21.012 44.056 20.732 43.096 20.172C42.136 19.612 41.376 18.844 40.816 17.868C40.272 16.892 40 15.796 40 14.58C40 13.348 40.272 12.252 40.816 11.292C41.376 10.332 42.128 9.572 43.072 9.012C44.016 8.452 45.096 8.172 46.312 8.172C47.304 8.172 48.184 8.388 48.952 8.82C49.736 9.236 50.376 9.844 50.872 10.644L50.512 11.316V8.46H53.08V20.844C53.08 21.964 52.808 22.964 52.264 23.844C51.736 24.74 51 25.444 50.056 25.956C49.112 26.468 48.024 26.724 46.792 26.724ZM46.648 18.492C47.368 18.492 48.008 18.324 48.568 17.988C49.128 17.636 49.568 17.172 49.888 16.596C50.224 16.004 50.392 15.34 50.392 14.604C50.392 13.868 50.224 13.204 49.888 12.612C49.552 12.02 49.104 11.556 48.544 11.22C47.984 10.868 47.352 10.692 46.648 10.692C45.912 10.692 45.256 10.868 44.68 11.22C44.104 11.556 43.648 12.02 43.312 12.612C42.992 13.188 42.832 13.852 42.832 14.604C42.832 15.324 42.992 15.98 43.312 16.572C43.648 17.164 44.104 17.636 44.68 17.988C45.256 18.324 45.912 18.492 46.648 18.492Z"
        fill="black"
      ></path>
      <path
        d="M56.2546 21.444V3.276H58.9666V21.444H56.2546Z"
        fill="black"
      ></path>
      <path
        d="M66.7694 21.732C65.7934 21.732 64.9374 21.516 64.2014 21.084C63.4654 20.636 62.8894 20.02 62.4734 19.236C62.0734 18.436 61.8734 17.516 61.8734 16.476V8.46H64.5854V16.236C64.5854 16.828 64.7054 17.348 64.9454 17.796C65.1854 18.244 65.5214 18.596 65.9534 18.852C66.3854 19.092 66.8814 19.212 67.4414 19.212C68.0174 19.212 68.5214 19.084 68.9534 18.828C69.3854 18.572 69.7214 18.212 69.9614 17.748C70.2174 17.284 70.3454 16.74 70.3454 16.116V8.46H73.0334V21.444H70.4654V18.9L70.7534 19.236C70.4494 20.036 69.9454 20.652 69.2414 21.084C68.5374 21.516 67.7134 21.732 66.7694 21.732Z"
        fill="black"
      ></path>
      <path
        d="M82.2959 21.732C80.9999 21.732 79.8479 21.436 78.8399 20.844C77.8479 20.236 77.0719 19.42 76.5119 18.396C75.9519 17.356 75.6719 16.196 75.6719 14.916C75.6719 13.604 75.9519 12.444 76.5119 11.436C77.0879 10.428 77.8559 9.636 78.8159 9.06C79.7759 8.468 80.8639 8.172 82.0799 8.172C83.0559 8.172 83.9279 8.34 84.6959 8.676C85.4639 9.012 86.1119 9.476 86.6399 10.068C87.1679 10.644 87.5679 11.308 87.8399 12.06C88.1279 12.812 88.2719 13.612 88.2719 14.46C88.2719 14.668 88.2639 14.884 88.2479 15.108C88.2319 15.332 88.1999 15.54 88.1519 15.732H77.8079V13.572H86.6159L85.3199 14.556C85.4799 13.772 85.4239 13.076 85.1519 12.468C84.8959 11.844 84.4959 11.356 83.9519 11.004C83.4239 10.636 82.7999 10.452 82.0799 10.452C81.3599 10.452 80.7199 10.636 80.1599 11.004C79.5999 11.356 79.1679 11.868 78.8639 12.54C78.5599 13.196 78.4399 13.996 78.5039 14.94C78.4239 15.82 78.5439 16.588 78.8639 17.244C79.1999 17.9 79.6639 18.412 80.2559 18.78C80.8639 19.148 81.5519 19.332 82.3199 19.332C83.1039 19.332 83.7679 19.156 84.3119 18.804C84.8719 18.452 85.3119 17.996 85.6319 17.436L87.8399 18.516C87.5839 19.124 87.1839 19.676 86.6399 20.172C86.1119 20.652 85.4719 21.036 84.7199 21.324C83.9839 21.596 83.1759 21.732 82.2959 21.732Z"
        fill="black"
      ></path>
      <path
        d="M95.7186 21.732C94.3906 21.732 93.2226 21.404 92.2146 20.748C91.2226 20.092 90.5266 19.212 90.1266 18.108L92.2146 17.124C92.5666 17.86 93.0466 18.444 93.6546 18.876C94.2786 19.308 94.9666 19.524 95.7186 19.524C96.3586 19.524 96.8786 19.38 97.2786 19.092C97.6786 18.804 97.8786 18.412 97.8786 17.916C97.8786 17.596 97.7906 17.34 97.6146 17.148C97.4386 16.94 97.2146 16.772 96.9426 16.644C96.6866 16.516 96.4226 16.42 96.1506 16.356L94.1106 15.78C92.9906 15.46 92.1506 14.98 91.5906 14.34C91.0466 13.684 90.7746 12.924 90.7746 12.06C90.7746 11.276 90.9746 10.596 91.3746 10.02C91.7746 9.428 92.3266 8.972 93.0306 8.652C93.7346 8.332 94.5266 8.172 95.4066 8.172C96.5906 8.172 97.6466 8.468 98.5746 9.06C99.5026 9.636 100.159 10.444 100.543 11.484L98.4546 12.468C98.1986 11.844 97.7906 11.348 97.2306 10.98C96.6866 10.612 96.0706 10.428 95.3826 10.428C94.7906 10.428 94.3186 10.572 93.9666 10.86C93.6146 11.132 93.4386 11.492 93.4386 11.94C93.4386 12.244 93.5186 12.5 93.6786 12.708C93.8386 12.9 94.0466 13.06 94.3026 13.188C94.5586 13.3 94.8226 13.396 95.0946 13.476L97.2066 14.1C98.2786 14.404 99.1026 14.884 99.6786 15.54C100.255 16.18 100.543 16.948 100.543 17.844C100.543 18.612 100.335 19.292 99.9186 19.884C99.5186 20.46 98.9586 20.916 98.2386 21.252C97.5186 21.572 96.6786 21.732 95.7186 21.732Z"
        fill="black"
      ></path>
      <path
        d="M108.816 21.588C107.456 21.588 106.4 21.204 105.648 20.436C104.896 19.668 104.52 18.588 104.52 17.196V10.908H102.24V8.46H102.6C103.208 8.46 103.68 8.284 104.016 7.932C104.352 7.58 104.52 7.1 104.52 6.492V5.484H107.232V8.46H110.184V10.908H107.232V17.076C107.232 17.524 107.304 17.908 107.448 18.228C107.592 18.532 107.824 18.772 108.144 18.948C108.464 19.108 108.88 19.188 109.392 19.188C109.52 19.188 109.664 19.18 109.824 19.164C109.984 19.148 110.136 19.132 110.28 19.116V21.444C110.056 21.476 109.808 21.508 109.536 21.54C109.264 21.572 109.024 21.588 108.816 21.588Z"
        fill="black"
      ></path>
      <path
        d="M116.697 21.732C115.817 21.732 115.041 21.58 114.369 21.276C113.713 20.956 113.201 20.524 112.833 19.98C112.465 19.42 112.281 18.764 112.281 18.012C112.281 17.308 112.433 16.676 112.737 16.116C113.057 15.556 113.545 15.084 114.201 14.7C114.857 14.316 115.681 14.044 116.673 13.884L121.185 13.14V15.276L117.201 15.972C116.481 16.1 115.953 16.332 115.617 16.668C115.281 16.988 115.113 17.404 115.113 17.916C115.113 18.412 115.297 18.82 115.665 19.14C116.049 19.444 116.537 19.596 117.129 19.596C117.865 19.596 118.505 19.436 119.049 19.116C119.609 18.796 120.041 18.372 120.345 17.844C120.649 17.3 120.801 16.7 120.801 16.044V12.708C120.801 12.068 120.561 11.548 120.081 11.148C119.617 10.732 118.993 10.524 118.209 10.524C117.489 10.524 116.857 10.716 116.313 11.1C115.785 11.468 115.393 11.948 115.137 12.54L112.881 11.412C113.121 10.772 113.513 10.212 114.057 9.732C114.601 9.236 115.233 8.852 115.953 8.58C116.689 8.308 117.465 8.172 118.281 8.172C119.305 8.172 120.209 8.364 120.993 8.748C121.793 9.132 122.409 9.668 122.841 10.356C123.289 11.028 123.513 11.812 123.513 12.708V21.444H120.921V19.092L121.473 19.164C121.169 19.692 120.777 20.148 120.297 20.532C119.833 20.916 119.297 21.212 118.689 21.42C118.097 21.628 117.433 21.732 116.697 21.732Z"
        fill="black"
      ></path>
      <path
        d="M132.852 21.732C131.556 21.732 130.404 21.436 129.396 20.844C128.404 20.236 127.612 19.42 127.02 18.396C126.444 17.372 126.156 16.212 126.156 14.916C126.156 13.636 126.444 12.484 127.02 11.46C127.596 10.436 128.388 9.636 129.396 9.06C130.404 8.468 131.556 8.172 132.852 8.172C133.732 8.172 134.556 8.332 135.324 8.652C136.092 8.956 136.756 9.38 137.316 9.924C137.892 10.468 138.316 11.1 138.588 11.82L136.212 12.924C135.94 12.252 135.5 11.716 134.892 11.316C134.3 10.9 133.62 10.692 132.852 10.692C132.116 10.692 131.452 10.876 130.86 11.244C130.284 11.596 129.828 12.1 129.492 12.756C129.156 13.396 128.988 14.124 128.988 14.94C128.988 15.756 129.156 16.492 129.492 17.148C129.828 17.788 130.284 18.292 130.86 18.66C131.452 19.028 132.116 19.212 132.852 19.212C133.636 19.212 134.316 19.012 134.892 18.612C135.484 18.196 135.924 17.644 136.212 16.956L138.588 18.084C138.332 18.772 137.916 19.396 137.34 19.956C136.78 20.5 136.116 20.932 135.348 21.252C134.58 21.572 133.748 21.732 132.852 21.732Z"
        fill="black"
      ></path>
      <path
        d="M141.239 21.444V3.276H143.951V15.444L142.895 15.18L149.399 8.46H152.783L147.887 13.668L152.999 21.444H149.879L145.319 14.556L146.927 14.34L143.087 18.42L143.951 16.62V21.444H141.239Z"
        fill="black"
      ></path>
    </svg>
  );
};
const groupAllSortedCombinations = (allCombinations: Array<any>, key: any) => {
  let allAvailableSize = {} as any;
  if (allCombinations.length) {
    allCombinations.map((item) => {
      if (Array.isArray(key)) {
        if (item[key[0]][key[1]]) {
          allAvailableSize[item[key[0]][key[1]]] = 1;
        }
      } else {
        if (item[key]) {
          allAvailableSize[item[key]] = 1;
        }
      }
    });
  }

  let CombinationsSortedByKeys = {} as any;
  Object.keys(allAvailableSize).map((combinationKey) => {
    CombinationsSortedByKeys[combinationKey] = allCombinations.filter(
      (item) => {
        if (Array.isArray(key)) {
          return item[key[0]][key[1]] === combinationKey;
        } else {
          return item[key] === combinationKey;
        }
      }
    );
  });
  return CombinationsSortedByKeys;
};

const ExplorePage: React.FC<ExplorePageProps> = ({ slug }) => {
  if (slug === "") {
    return <div>Slug is empty</div>;
  }

  const component = slug;

  if (!StoryData[component]) {
    return <div>Component not found</div>;
  }

  const Story = StoryData[component]["story"];

  const StoryArgs = StoryData[component]["meta"];
  // Extract Meta info
  let metaInfo = StoryArgs.metaInfo;
  if (!metaInfo) {
    metaInfo = {};
  }
  if (!metaInfo.clusteringOrder) {
    metaInfo.clusteringOrder = ["size", "variant"];
  }
  if (!metaInfo.FigmaDesc) {
    metaInfo.FigmaDesc = "This is a component FigmaUIKit for Gluestack UI";
  }
  // Extract Meta info

  const options: Options = StoryArgs.argTypes;
  const combinations: Combination[] = [];
  const allCombinations: Combination[] = [];

  if (options) {
    const filteredOptions = { ...options };
    STATE_PROPERTIES.forEach((state) => {
      delete filteredOptions[state];
    });

    generateCombinations(combinations, filteredOptions, 0, {});
  }

  combinations.forEach((combination) => {
    STATE_PROPERTIES.forEach((state) => {
      if (Object.keys(options).includes(state)) {
        const newStateCombination: any = { ...combination };
        newStateCombination[state] = true;
        allCombinations.push(newStateCombination);
      }
    });
    allCombinations.push({ ...combination });
  });

  let isStateComponent = false;
  let clusterOrderSortedCombinations = groupAllSortedCombinations(
    allCombinations,
    metaInfo.clusteringOrder[0]
  );

  if (Object.keys(clusterOrderSortedCombinations).length === 0) {
    clusterOrderSortedCombinations["default"] = allCombinations;
    let varainatSortedCombinations = groupAllSortedCombinations(
      clusterOrderSortedCombinations["default"],
      metaInfo.clusteringOrder[1]
    );
    if (Object.keys(varainatSortedCombinations).length === 0) {
      clusterOrderSortedCombinations["default"] = {};
      clusterOrderSortedCombinations["default"]["default"] = allCombinations;
    } else {
      clusterOrderSortedCombinations["default"] = varainatSortedCombinations;
    }
  } else {
    Object.keys(clusterOrderSortedCombinations).forEach((sizeKey) => {
      let varainatSortedCombinations = groupAllSortedCombinations(
        clusterOrderSortedCombinations[sizeKey],
        metaInfo.clusteringOrder[1]
      );
      if (Object.keys(varainatSortedCombinations).length === 0) {
        let tempSizeCombs = Array.isArray(
          clusterOrderSortedCombinations[sizeKey]
        )
          ? [...clusterOrderSortedCombinations[sizeKey]]
          : { ...clusterOrderSortedCombinations[sizeKey] };
        clusterOrderSortedCombinations[sizeKey] = {};
        clusterOrderSortedCombinations[sizeKey]["default"] = tempSizeCombs;
      } else {
        clusterOrderSortedCombinations[sizeKey] = varainatSortedCombinations;
      }
    });
  }

  // console.log("MetaInfo", clusterOrderSortedCombinations);

  return (
    <Center p="$8" bg="$white" overflow="scroll" w="100%">
      <VStack space="xl" alignSelf="flex-start" mb="$16">
        <GluestackLogo />
        <Heading
          size="2xl"
          // bg="$yellow300"
          rounded="$md"
          letterSpacing="$xl"
          color="$textLight800"
        >
          {component[0].toUpperCase()}
        </Heading>
        <Text>{metaInfo.FigmaDesc}</Text>
      </VStack>
      <Center
        bg="$white"
        overflow="scroll"
        w="100%"
        borderStyle="dashed"
        borderWidth={"$1"}
        borderColor="$teal400"
        borderRadius="$2xl"
      >
        {allCombinations.length === 0 && (
          <Story
            dataSet={{
              "component-props": JSON.stringify({
                "component-name": component[0],
              }),
            }}
          />
        )}
        {allCombinations.length > 0 && (
          <VStack p="$4" space="4xl">
            {Object.keys(clusterOrderSortedCombinations).map(
              (clusterFirstOrder: any, index) => {
                let variantSortedCombination =
                  clusterOrderSortedCombinations[clusterFirstOrder];

                return (
                  <HStack
                    space="3xl"
                    p="$4"
                    alignItems="flex-start"
                    // justifyContent="center"
                  >
                    {clusterFirstOrder === "default" ? (
                      <></>
                    ) : (
                      <Heading size="sm">{clusterFirstOrder}</Heading>
                    )}
                    {Object.keys(variantSortedCombination).map(
                      (variantName: any, index) => {
                        let stateSortedCombination =
                          variantSortedCombination[variantName];

                        return (
                          <VStack space="md" alignItems="center">
                            {variantName === "default" ? (
                              <></>
                            ) : (
                              <Heading size="sm">{variantName}</Heading>
                            )}
                            {/* <Text bold>{variantName}</Text> */}
                            {variantName === "default" ? (
                              <HStack
                                w="$full"
                                maxWidth="1200px"
                                flexWrap="wrap"
                                space="lg"
                              >
                                {Array.isArray(stateSortedCombination) &&
                                  stateSortedCombination.map((props: any) => {
                                    props = {
                                      ...props,
                                      // orientation: clusterFirstOrder,
                                      // clusterFirstOrder: variantName,
                                    };
                                    const dataProps: any = {
                                      ...props,
                                    };
                                    dataProps["component-name"] = component[0];

                                    STATE_PROPERTIES.forEach((state) => {
                                      if (props[state]) {
                                        isStateComponent = true;
                                        dataProps["state"] = state;
                                        delete dataProps[state];
                                      }
                                    });

                                    if (
                                      !dataProps["state"] &&
                                      isStateComponent
                                    ) {
                                      dataProps["state"] = "default";
                                    }

                                    if (
                                      dataProps.uri &&
                                      dataProps.uri === "https://broken.link"
                                    ) {
                                      dataProps.uri = "BrokenLink";
                                    } else if (dataProps.uri) {
                                      dataProps.uri = "ImageLink";
                                    }

                                    if (dataProps.name) {
                                      dataProps.name =
                                        dataProps.name.displayName;
                                    }

                                    props.dataSet = {
                                      "component-props":
                                        JSON.stringify(dataProps),
                                    };

                                    return (
                                      <Center key={index}>
                                        <Story {...props} />
                                      </Center>
                                    );
                                  })}
                              </HStack>
                            ) : (
                              <VStack space="lg">
                                {Array.isArray(stateSortedCombination) &&
                                  stateSortedCombination.map((props: any) => {
                                    props = {
                                      ...props,
                                      // clusterFirstOrder,
                                      // variant: variantName,
                                    };
                                    const dataProps: any = {
                                      ...props,
                                    };
                                    dataProps["component-name"] = component[0];

                                    STATE_PROPERTIES.forEach((state) => {
                                      if (props[state]) {
                                        isStateComponent = true;
                                        dataProps["state"] = state;
                                        delete dataProps[state];
                                      }
                                    });

                                    if (
                                      !dataProps["state"] &&
                                      isStateComponent
                                    ) {
                                      dataProps["state"] = "default";
                                    }

                                    if (
                                      dataProps.uri &&
                                      dataProps.uri === "https://broken.link"
                                    ) {
                                      dataProps.uri = "BrokenLink";
                                    } else if (dataProps.uri) {
                                      dataProps.uri = "ImageLink";
                                    }

                                    if (dataProps.name) {
                                      dataProps.name =
                                        dataProps.name.displayName;
                                    }

                                    props.dataSet = {
                                      "component-props":
                                        JSON.stringify(dataProps),
                                    };

                                    return (
                                      <Center key={index}>
                                        <Story {...props} />
                                      </Center>
                                    );
                                  })}
                              </VStack>
                            )}
                          </VStack>
                        );
                      }
                    )}
                  </HStack>
                );
              }
            )}
          </VStack>
        )}
      </Center>
    </Center>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const baseDirPath = process.cwd();
  const tree = DirectoryTree(path.join(baseDirPath, "components/stories"));
  const filePaths = getFilePaths(tree);
  const paths: { params: { slug: string[] } }[] = [];

  filePaths?.forEach((filename) => {
    const slug = filename;
    paths.push({
      params: {
        slug: [slug],
      },
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ExplorePageProps> = async (
  context
) => {
  const { slug } = context.params as { slug: string };
  return {
    props: {
      slug: slug || "",
    },
  };
};

export default ExplorePage;
