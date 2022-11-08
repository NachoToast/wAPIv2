enum Permissions {
    None = 0,

    /** This user can change other user's permissions (excluding this one). */
    AssignPermissions = 1 << 0,

    /** This user can modify post attributes, delete other user's comments, and accept/deny posts. */
    Audit = 1 << 1,

    /** This user can comment on posts (default permission). */
    Comment = 1 << 2,

    /** This user can submit posts (to be audited). */
    Upload = 1 << 3,
}

export default Permissions;
