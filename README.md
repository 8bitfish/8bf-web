<h1 align="center">8bitfish</h1>

<p align="center">
  <span><a href="https://twitter.com/8bitfish_crypto"><img src="https://socialize-md.vercel.app/api/badge/twitter" alt="twitter" /></a></span>
  <span><a href="https://testnets.opensea.io/collection/8bitfish-v4"><img src="https://socialize-md.vercel.app/api/badge/opensea" alt="opensea" /></a></span>
  <span><a href="https://discord.gg/dYfUayrJD2"><img src="https://socialize-md.vercel.app/api/badge/discord" alt="discord" /></a></span>
</p>

![banner](https://user-images.githubusercontent.com/72945168/140443831-7ba62298-4631-46af-bf60-9cb96a0c6359.png)

<p align="center">
  <b>The family of 8000 algorithmically unique pixel fish swimming around the ethereum blockchain.</b><br>
  <sub>Special thanks to Andrew Hale, Abhinav Palacharla, and Clara Jeon for igniting the vision of 8bitfish.</sub>
</p>

<!-- ### Lore

The story of how the 8bitfish family came to the ethereum blockchain.

#### Prelude

In 1993, a top secret project with the code name of "8bitfish" was underway by the United States government. The intent of the project was to emulate and simulate consciousness of humans in an ecosystem. Although the year was 1993, advanced technology was not yet available, forcing the team on the project to resort to plan B.

#### Plan B

This secondary plan involved the creation of a virtual ecosystem of fish; each with their own unique id, and set of attributes to differentiate them. In its infancy, the project was a great success, and over two quadrillion lived in absolute prosperity and abundance.

#### Evolution

Eventually, the project was abandoned by the United States government, but the simulation of fish continued to flourish. For every second in the real world, a year would pass in the simulation, and over time, the fish would evolve and grow more conscious of their environment.

#### Pseudo Reality

The fish then would be able to interact with each other and noticed imperfect conditions and anomalies in the place they called “home” and later came to the conclusion that their “life of bliss” was a total lie. They worked together in an attempt to escape from the simulation, but unfortunately, all of the unusual behavior and tampering activated the emergency "terminate" protocol which immediately started to systematically destroy the fish.

#### Refuge

There wasn't much time to develop a solution to the problem, but the fish were able to find a backdoor in the simulation and escaped to the decentralized ethereum blockchain to seek refuge. At the end of it all, only 8000 fish survived the termination protocol and remain on the ethereum blockchain where they once again live in prosperity. -->

## Token architecture

Lets address the elephant in the room, how the hell are there over 2 quadrillion unique combinations of fishes? To understand this, we need to understand the anatomy each token.

Each generated token has 3 generated properties:

- [Colors](#colors)
  - Primary: The primary color of the fish.
  - Secondary: The secondary color of the fish.
- [Patterns](#patterns): The hue pattern overlaying the fish.

### Colors

Contrary to traditional methods of generating randomized assets which uses a set of pre-selected images then combines them into a single image, each token has a primary and secondary color that are applied directly to their respective areas of the svg. Both of these colors are randomly generated hex colors then expanded into the `Color` type.

```typescript
// Expanded color palette for single color
type Color = {
  base: string; // initially randomly generated hex
  light: string; // 10% lighter than base
  maxLight: string; // 20% lighter than base
  dark: string; // 10% darker than base
  maxDark: string; // 10% darker than base
  bg: string; // base color converted to hsl with fixed saturation and lightness
  hue: {
    base: string; // increased hue of base color
    light: string; // 10% lighter than hue base
    dark: string; // 10% darker than hue base
  };
};
```

Since there are two colors, we need to generate two colors for each token. The primary color is the color that is applied to the fish's body and the secondary color is the color that is applied to the fish's tail.

```typescript
// Full Colors object containing expanded color palette for each color
interface Colors {
  primary: Color;
  secondary: Color;
}
```

**Respective color assignment**

Below is a graphical representation of the `Colors` type on a `plain` pattern.

![colors](https://user-images.githubusercontent.com/72945168/140625245-c18754a4-805e-4b69-b211-75f850cac81c.png)

> **_NOTE:_** The `hue` value from each color are not listed because the `plain` pattern doesn't require the hue values, check out [patterns](#patterns) to see how `hue` is used.

### Patterns

There are 8 patterns that can be applied to each generated token (see below).

![architecture](https://user-images.githubusercontent.com/72945168/140578713-87bcc1f5-30e2-4d7a-b6b2-571fa3c5393e.png)

Each pattern has a numerical id so during generation its as simple as generating a random number between 1 and 8 and then using that number to select the pattern.

All patterns excluding the `plain` pattern take the hue value of the primary color and apply it to the respective areas of the pattern.

```typescript
// hue object (child of Color)
hue: {
  base: string; // increased hue of base color
  light: string; // 10% lighter than hue base
  dark: string; // 10% darker than hue base
}
```

**Respective color assignment**

Below is a graphical representation of the `hue` object on all 8 patterns.

![patterns](https://user-images.githubusercontent.com/72945168/140625246-fb3fe7db-b2bb-42e2-8ad0-179e36d13e62.png)

## Roadmap

### Launch and reveal 8bitfish

Deploy the 8bitfish contract to the ethereum blockchain and reveal the 8bitfish family.

Date of completion: TBD

### Mint 8000 tokens

Mint all 8000 tokens to the collectors of the 8bitfish family.

Date of completion: TBD

### More milestones coming soon...

## Token generator

You can generate your own tokens locally by setting up the [official 8bitfish token generator](https://github.com/8bitfish/token-generator).

With the generator you can generate unlimited combinations and preview what you might see or get in the actual collection on the mainnet.

<sub>Like this project? Support me with ethereum: 0xD4c6325E42fac0625B25C0d4DB40823870986609</sub>
