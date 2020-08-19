// material-ui core components
import { List, ListItem } from '@material-ui/core';
/*eslint-disable*/
import React, { useState } from 'react';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const [displayAcc, setDisplayAcc] = useState(false);
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const toggleDisplay = () => {
    setDisplayAcc(!displayAcc);
  };

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock} style={{cursor: "pointer"}}>
              <p className={classes.block} onClick={toggleDisplay}>
              Copyright &nbsp; 2020 &nbsp; © I do Arduino
              </p>
            </ListItem>
            {displayAcc ? (
              <>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/klw940"
                    className={classes.block}
                    target="_blank"
                  >
                    권혁규
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/oogg7754"
                    className={classes.block}
                    target="_blank"
                  >
                    김경훈
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/wheeking"
                    className={classes.block}
                    target="_blank"
                  >
                    김동휘
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/chloe-codes1"
                    className={classes.block}
                    target="_blank"
                  >
                    김주현
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/hyungjun268"
                    className={classes.block}
                    target="_blank"
                  >
                    김형준
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://github.com/guswls"
                    className={classes.block}
                    target="_blank"
                  >
                    유현진
                  </a>
                </ListItem>
         
              </>
            ) : (
              ''
            )}
                   <ListItem className={classes.inlineBlock}>
                  <a
                    href="mailto:futsalah1@gmail.com?subject=[ 문의합니다 ]"
                    className={classes.block}
                    target="_blank"
                  >
                    Contact us
                  </a>
                </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
