import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Datetime from 'react-datetime';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import { useFormik } from 'formik';

const useStyles = makeStyles(styles);
function AddInfoDialog(props) {
  const { open, onClose, userInfo, onChange, onRegister, changeAge } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  // Validation
  const formik = useFormik({
    initialValues: {
      email: '',
      height: '',
      weight: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('이메일을 입력해주세요.')
        .email('올바른 이메일 형식이 아닙니다'),
      weight: Yup.number()
        .moreThan(1, '입력하신 몸무게를 다시 확인해주세요.')
        .lessThan(200, '입력하신 몸무게를 다시 확인해주세요.')
        .positive()
        .nullable(true)
        .notRequired(),
      height: Yup.number()
        .moreThan(100, '입력하신 키를 다시 확인해주세요.')
        .lessThan(300, '입력하신 키를 다시 확인해주세요.')
        .positive()
        .nullable(true)
        .notRequired(),
    }),
    onSubmit: () => {},
  });

  const onSubmit = () => {
    formik.submitForm();
    console.log('formik.values??', formik.values);
    if (!formik.isValid || !formik.values.email || !formik.values.height || !formik.values.weight) {
      console.log('Caught in validation filter...');
      return;
    }
    onRegister();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">회원가입 - 추가정보입력</DialogTitle>
      <DialogContent>
        <DialogContentText>
          안녕하세요. Futsalah에 오신것을 환영합니다! {userInfo.name}님은 첫번째
          로그인이시며 서비스이용을 위해 추가정보를 입력 부탁드립니다.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          id="email"
          label="이메일"
          type="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback">{formik.errors.email}</div>
        )}
        <h3 className={classes.buttonTitle}>출생연도</h3>
        <Datetime
          name="age"
          dateFormat="YYYY"
          timeFormat={false}
          onChange={(value) => changeAge(value._d.getFullYear())}
        />

        <TextField
          name="height"
          margin="dense"
          id="height"
          label="키"
          fullWidth
          value={formik.values.height}
          onChange={formik.handleChange}
        />
        {formik.touched.height && formik.errors.height && (
          <div className="invalid-feedback">{formik.errors.height}</div>
        )}
        <TextField
          name="weight"
          margin="dense"
          id="weight"
          label="몸무게"
          fullWidth
          value={formik.values.weight}
          onChange={formik.handleChange}
        />
        {formik.touched.weight && formik.errors.weight && (
          <div className="invalid-feedback">{formik.errors.weight}</div>
        )}
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-autowidth-label">
            선호포지션
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            name="position"
            fullWidth
            onChange={onChange}
          >
            <MenuItem value="all">ALL</MenuItem>
            <MenuItem value="pivo">PIVO</MenuItem>
            <MenuItem value="ala">ALA</MenuItem>
            <MenuItem value="fixo">FIXO</MenuItem>
            <MenuItem value="goleiro">GOLEIRO</MenuItem>
          </Select>
          <FormHelperText>
            풋살에서 선호하는 포지션을 선택해주세요.
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          저장하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddInfoDialog;
