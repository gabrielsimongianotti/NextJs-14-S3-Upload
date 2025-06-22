import React, { useContext } from 'react';

import styles from './styles.module.css';



const InputSelect = ({ action }: { action: (value: any) => void }) => {


  return (
    <select id="fontSelect"
      className={styles.dropdownSelect}
      onChange={({
        target
      }) => {
        action(target.value)
      }} >
      <option
        value="default"
      >
        Tamanhos da imagens
      </option>
      <option
        value="great"
      >
        Grande
      </option>

      <option
        value="medium"
      >
        Medio
      </option>

      <option
        value="small"
      >
        Pequeno
      </option>
    </select >
  );
};

export default InputSelect;