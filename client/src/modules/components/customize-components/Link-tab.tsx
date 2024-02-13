import { Tab } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkTabProps {
  label?: string | ReactNode;
  href: string;
  style?: CSSProperties;
  className?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={(event: any) => <Link {...event} to={props.href} />}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (event.currentTarget.ariaSelected === 'true') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export default LinkTab;
