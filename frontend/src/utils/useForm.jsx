import { useState } from 'react'

const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState(initialForm);

    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onArrayChange = (name, index, newValue) => {
      setFormState(prevState => ({
        ...prevState,
        [name]: prevState[name].map((item, i) =>
          i === index ? { ...item, ...newValue } : item
        )
      }));
    };

    const onAddItem = (name, newItem) => {
      setFormState(prevState => ({
        ...prevState,
        [name]: [...prevState[name], newItem]
      }));
    };

    const onRemoveItem = (name, index) => {
      setFormState(prevState => ({
        ...prevState,
        [name]: prevState[name].filter((_, i) => i !== index)
      }));
    };

    const onResetForm = () => {
        setFormState(initialForm);
    }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    onArrayChange,
    onAddItem,
    onRemoveItem,
  }
}

export default useForm
