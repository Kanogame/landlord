import SlideScroller from "~/blocks/slideScroller";
import Block from "~/components/Block";
import type { Route } from "../+types/root";

export async function loader({ params }: Route.LoaderArgs) {
  return { id: params["id"] };
}

export default function SeachPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {loaderData.id}
      <div>
        <Block label="Аренда">
          <div>something</div>
        </Block>
      </div>
    </div>
  );
}
