import { FormControl } from './FormControl'

type UserFormProps = {
    username: string
    password: string
    updateFields: (fields: Partial<UserFormProps>) => void
}

export const AccountForm = ({ username, password, updateFields }: UserFormProps) => {
    return (
        <>
            <h2>Almost done</h2>
            <FormControl>
                <input type='text' name='username' value={username} placeholder='Enter username' required autoFocus onChange={(e) => updateFields({ username: e.target.value })} />

                <input type='text' name='password' value={password} required onChange={(e) => updateFields({ password: e.target.value })} />

                {/*     <form onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                name="username"
                value={input.username}
                placeholder="Enter username dynamic"
                required
                autoFocus
                onChange={event => handleFormChange(index, event)}
              />

              <input
                type="text"
                name="password"
                value={input.password}
                required
                onChange={event => handleFormChange(index, event)}
              />
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add Fields</button>
      <button onClick={submit}>SUBMIT</button> */}
            </FormControl>
        </>
    )
}
