export class InvalidInputError extends Error {
  constructor(message: string) {
    super();
    this.message = message || "Invalid Input";
  }
}

export type Direction = "north" | "east" | "south" | "west";
type Coordinates = [number, number];

export class Robot {
  direction: Direction = "north";
  x = 0;
  y = 0;

  get bearing(): Direction {
    return this.direction;
  }

  get coordinates(): Coordinates {
    return [this.x, this.y];
  }

  place({
    x,
    y,
    direction,
  }: {
    x: number;
    y: number;
    direction: Direction;
  }): void {
    if (["north", "east", "south", "west"].includes(direction)) {
      this.direction = direction;
      this.x = x;
      this.y = y;
    } else {
      throw new InvalidInputError("Please input valid input");
    }
  }

  moveOnTheAxis(): void {
    switch (this.direction) {
      case "north":
        this.y += 1;
        break;
      case "south":
        this.y -= 1;
        break;
      case "east":
        this.x += 1;
        break;
      case "west":
        this.x -= 1;
        break;
    }
  }

  performInstruction(instruction: string): void {
    const cardinalPoints: Array<Direction> = ["north", "east", "south", "west"];

    const cardinalIndex = cardinalPoints.indexOf(this.direction);

    switch (instruction) {
      case "R":
        this.direction =
          cardinalPoints[(cardinalIndex + 1) % cardinalPoints.length];
        break;
      case "L":
        this.direction = cardinalPoints.slice(cardinalIndex - 1)[0];
        break;
      case "A":
        this.moveOnTheAxis();
        break;
    }
  }

  evaluate(instructions: string): any {
    instructions.split("").map((inst) => this.performInstruction(inst));
  }
}
