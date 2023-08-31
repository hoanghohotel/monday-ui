import { camelCase } from "lodash-es";
import { ComponentDefaultTestId, getTestId } from "../../tests/test-ids-utils";
import cx from "classnames";
import { getStyle } from "../../helpers/typesciptCssModulesHelper";
import React, { FC, useMemo } from "react";
import { backwardCompatibilityForProperties } from "../../helpers/backwardCompatibilityForProperties";
import Text from "../Text/Text";
import Leg from "./Leg";
import { LabelColor, LabelKind } from "./LabelConstants";
import { VibeComponentProps, withStaticProps } from "../../types";
import styles from "./Label.module.scss";

interface LabelProps extends VibeComponentProps {
  /**
   * Backward compatibility for props naming - please use className instead
   */
  wrapperClassName?: string;
  /**
   * Class name for an inner text wrapper
   */
  labelClassName?: string;
  kind?: LabelKind;
  color?: LabelColor;
  text?: string;
  isAnimationDisabled?: boolean;
  isLegIncluded?: boolean;
}

const Label: FC<LabelProps> & {
  colors?: typeof LabelColor;
  kinds?: typeof LabelKind;
} = ({
  className,
  wrapperClassName,
  labelClassName,
  kind = LabelKind.FILL,
  color = LabelColor.PRIMARY,
  text = "",
  isAnimationDisabled = false,
  isLegIncluded = false,
  id,
  "data-testid": dataTestId
}) => {
  const overrideClassName = backwardCompatibilityForProperties([className, wrapperClassName]) as string;
  const textColor = color === LabelColor.DARK ? Text.colors.ON_PRIMARY : Text.colors.ON_INVERTED;
  const classNames = useMemo(
    () =>
      cx(
        styles.label,
        getStyle(styles, camelCase("kind" + "-" + kind)),
        getStyle(styles, camelCase("color" + "-" + color)),
        {
          [styles.withAnimation]: !isAnimationDisabled,
          [styles.withLeg]: isLegIncluded
        },
        labelClassName
      ),
    [kind, color, isAnimationDisabled, isLegIncluded, labelClassName]
  );
  return (
    <span className={cx(overrideClassName)} data-testid={dataTestId || getTestId(ComponentDefaultTestId.LABEL, id)}>
      <Text type={Text.types.TEXT2} className={classNames} color={textColor}>
        <span>{text}</span>
        <span className={cx(styles.legWrapper)}>{isLegIncluded ? <Leg /> : null}</span>
      </Text>
    </span>
  );
};

export default withStaticProps(Label, {
  colors: LabelColor,
  kinds: LabelKind
});
