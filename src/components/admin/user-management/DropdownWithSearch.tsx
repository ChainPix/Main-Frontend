import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

type DropdownWithSearchProps = {
  users: string[];
  menuButtonLabel: string;
  defaultInputValue: string;
  defaultSearchValue: string;
  onSelect: (value: string) => void;
};

const DropdownWithSearch = ({
  users,
  menuButtonLabel,
  defaultInputValue,
  defaultSearchValue,
  onSelect,
}: DropdownWithSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultInputValue);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm)
  );

  const handleUserSelect = (user: string) => {
    setSelectedValue(user);
    onSelect(user);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center flex-row pl-3 pt-1">
      <Menu as="div" className="relative">
        <Menu.Button
          className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
        >
          <button
            onClick={toggleDropdown}
            className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {menuButtonLabel}
          </button>
        </Menu.Button>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items
            static
            className="origin-top-left absolute left-0 mt-2 w-full max-w-md rounded-3xl shadow-lg bg-white ring-1 ring-gray-900/5 focus:outline-none z-50"
          >
            <div className="p-4">
              <input
                onChange={handleSearchChange}
                className="block w-full px-4 py-2 mb-1 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                type="text"
                placeholder="Search 🔎"
                autoComplete="off"
                value={searchTerm}
              />
              {filteredUsers.map((user, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      className="group relative flex gap-x-6 rounded-lg p-1.5 hover:bg-gray-50 cursor-pointer focus:outline-none"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUserSelect(user);
                      }}
                    >
                      <span className="font-semibold text-gray-900">{user}</span>
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <input
        disabled={true}
        type="text"
        id="assigneeInput"
        placeholder="Selected Assignee"
        value={selectedValue}
        className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
      />
    </div>
  );
};

export default DropdownWithSearch;
