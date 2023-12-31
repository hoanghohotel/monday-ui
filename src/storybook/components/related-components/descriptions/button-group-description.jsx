import { useMemo } from "react";
import { RelatedComponent } from "vibe-storybook-components";
import ButtonGroup from "../../../../components/ButtonGroup/ButtonGroup";

export const ButtonGroupDescription = () => {
  const component = useMemo(
    () => (
      <ButtonGroup
        groupAriaLabel="button group aria label"
        value={1}
        options={[
          { value: 1, text: "Alpha" },
          { value: 2, text: "Beta" },
          { value: 3, text: "Delta" }
        ]}
      />
    ),
    []
  );
  return (
    <RelatedComponent
      component={component}
      title="Button group"
      href="/?path=/docs/buttons-button-group--overview"
      description="Used to group related options."
    />
  );
};
